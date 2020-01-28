import React from "react";
import ReactDOM from "react-dom";
import Input from "./Input.js";
import AskedQuestion from "./AskedQuestion.js";
import Answer from "./Answer.js";
import AnswerImage from "./AnswerImage.js";
import Notification from "./Notification.js";
import "./index.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      question: "",
      showNotification: false,
      notificationMessage: "",
      answer: "",
      answerImage: "",
      loading: false
    };
  }

  componentDidMount() {
    document.title = "Yes or No";
  }
  showNotification = message => {
    //after showing notification reset everything(resetting everything is a UX-decision. not resetting and keeping the previous answer and image could be an option too.)
    this.setState({
      showNotification: true,
      notificationMessage: message
    });
  };
  hideNotification = () => {
    this.setState({
      showNotification: false
    });
  };
  setStateAsync(state) {
    return new Promise(resolve => {
      this.setState(state, resolve);
    });
  }
  getAnswer = async () => {
    //get answer and image from API and save it to state.
    await this.setStateAsync({ loading: true });
    try {
      const data = await fetch("https://yesno.wtf/api");
      if (!data.ok) {
        throw Error(data.statusText);
      }
      const response = await data.json();
      const answer = response.answer;
      const answerImage = response.image;
      // since the response time too short to see loading screen, it is delayed by 2 seconds. application needs some time to think for better UX
      setTimeout(() => {
        this.setState({
          answer,
          answerImage,
          loading: false
        });
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  };
  handleSubmit = input => {
    //if there is ? at the end, save question and get the data from API
    //if theres is no ? at the end, show notification
    const questionMark = input.substring(input.length - 1, input.length);
    if (questionMark === "?") {
      this.setState({
        question: input
      });
    } else {
      this.showNotification("You did not ask a question!");
      setTimeout(this.hideNotification, 2000);
    }
  };

  componentDidUpdate(prevProps, prevState) {
    //if different input is provided, get answer again
    //if same question asked again, wont happen anything
    //this.state.question condition added to prevent getting data again while resetting
    if (this.state.question !== prevState.question && this.state.question) {
      this.getAnswer();
    }
    if (this.state.question !== prevState.question && !this.state.question) {
      //show notification when reset
      this.showNotification("Answer has been reset!");
      setTimeout(this.hideNotification, 2000);
    }
  }

  handleReset = () => {
    this.setState({
      answer: "",
      question: "",
      answerImage: ""
    });
  };

  render() {
    return (
      <div className="App">
        <h1>"yes" or "no"</h1>
        <h2>Ask your question?</h2>
        <Input
          handleSubmit={this.handleSubmit}
          question={this.state.question}
          handleReset={this.handleReset}
        />

        <Notification
          notificationMessage={this.state.notificationMessage}
          showNotification={this.state.showNotification}
        />

        <div>
          <AskedQuestion
            question={this.state.question}
            showNotification={this.state.showNotification}
          />
        </div>
        {this.state.loading ? (
          <h4 className="loading-text">Wait, I am thinking...</h4>
        ) : (
          <div className="response-container">
            <Answer answer={this.state.answer} />
            <AnswerImage answerImage={this.state.answerImage} />
          </div>
        )}
      </div>
    );
  }
}

export default App;

/*
Implementation steps
1) Add input element to JSX
2) Input should be controlled with state (implement proper event handler)
3) Add a button to submit the question to JSX
4) Add event handler of the button
5) As a result of submitting: show the question, answer in text, and answer as image at below
6) API endpoint is: https://yesno.wtf/api and example output:
  {
    "answer":"yes",
    "forced":false,
    "image":"https://yesno.wtf/assets/yes/1-af11222d8d4af90bdab8fc447c8cfebf.gif"
  }
7) Make asked question, answer and answer image as new component in different file.
8) Display an error message ("You didn't ask a question"), if user didn't write "?"(question mark) in the input.

Good to have:
- Make your code ES6 compatible
- Prefer stateless functional components over class components if you can
*/
