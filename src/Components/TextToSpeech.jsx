import React, { useRef } from "react";

export function TextToSpeech() {
  let textRef = useRef();
  let speech = new SpeechSynthesisUtterance();
  let voices = [];

  function speak() {
    voices = window.speechSynthesis.getVoices();
    console.log("textRef.current.value: ", textRef.current.value);
    speech.text = textRef.current.value;
    
    window.speechSynthesis.speak(speech);
  }
  return (
    <>
      <textarea ref={textRef} className="textField" />
      <button onClick={() => speak()}>Speak</button>
    </>
  );
}
