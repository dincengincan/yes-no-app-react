import React from "react";

function AskedQuestion(props) {
  const { question } = props;
  return <div>{question && <h3>Your question is: {question}</h3>}</div>;
}

export default AskedQuestion;
