import React from "react";

function AnswerImage(props) {
  const { answerImage } = props;
  return (
    <div>
      {answerImage && (
        <img className="response-image" src={answerImage} alt="Answer" />
      )}
    </div>
  );
}

export default AnswerImage;
