import React from "react";

class Input extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: ""
    };
  }

  handleChange = e => {
    const input = e.target.value;
    this.setState({
      input
    });
  };

  onSubmit = e => {
    e.preventDefault();
    const input = this.state.input;
    this.setState({
      input: ""
    });
    this.props.handleSubmit(input);
  };
  onReset = e => {
    e.preventDefault();
    this.props.handleReset();
  };
  render() {
    let placeholder = "Will you marry me?";
    if (this.props.question) {
      placeholder = "";
    }

    return (
      <form onSubmit={this.onSubmit}>
        <input
          type="text"
          placeholder={placeholder}
          value={this.state.input}
          onChange={this.handleChange}
        />
        <button>Ask</button>

        {this.props.question ? (
          <button onClick={this.onReset}>Reset</button>
        ) : (
          <button className="button-disabled">Reset</button>
        )}
      </form>
    );
  }
}

export default Input;
