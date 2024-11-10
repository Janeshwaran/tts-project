import { useRef } from "react";

import "./App.css";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
function App() {
  
  // Speech recognition
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  // text to speech
  let textRef = useRef();
  let speech = new SpeechSynthesisUtterance();
  let voices = [];

  function speak() {
    voices = window.speechSynthesis.getVoices();
    speech.text = textRef.current.value;
    console.log('voices: ', voices);
    speech.voice = voices[0]
    window.speechSynthesis.speak(speech);
  }
  return (
    <div className="flex">
      <textarea ref={textRef} className="textField" value={transcript} readOnly/>
      <div className="btns">
      {transcript !== "" || !listening &&
      <>
      <button onClick={SpeechRecognition.startListening}>Start</button>
      <button onClick={SpeechRecognition.stopListening}>Stop</button>
      </>
      }
      <button onClick={resetTranscript}>Reset Transcript</button>
      </div>
      {transcript !== "" && !listening &&
      <button onClick={() => speak()}>Text to Speech</button>}

      <p>Microphone: {listening ? 'on' : 'off'}</p>
     
    </div>)
}
export default App;
