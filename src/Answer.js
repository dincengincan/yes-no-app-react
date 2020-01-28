import React from "react";

function Answer(props) {
  const { answer } = props;
  return (
    <div>
      {answer && <h3 className="response-text">My answer is: {answer} </h3>}
    </div>
  );
}

export default Answer;
