import React, { useState, useEffect, useRef } from 'react';

function App() {
  const Input_Boxes = 5; // scalable
  const [otpArray, setOtpArray] = useState(new Array(Input_Boxes).fill(''));
  const inputRef = useRef([]);
  const [submissionMode, setSubmissionMode] = useState("MANUAL");

  // autofocus the first input box on the initial render
  useEffect(() => {
    inputRef.current[0]?.focus();
  },[])

  // OTP Input Handler
  const handleOtpChange = (otp, otpIndex) => {
    if(isNaN(otp)) return; // only numbers (0-9) are allowed

    const updatedValue = otp.slice(-1); // it will only pick the last typed number
    const newOtpArray = [...otpArray];
    newOtpArray[otpIndex] = updatedValue;
    setOtpArray(newOtpArray)

    if(updatedValue) {
      inputRef.current[otpIndex + 1]?.focus(); // only move the focus to next input, if the current input box has some value
    }

    if(submissionMode === "AUTO" && otpIndex === Input_Boxes-1 && updatedValue) {
      handleSubmit(newOtpArray.join(""), newOtpArray); // preventing the stale otp array 
    }
  }

  // Forward & backward Input Focus Handler
  const handleKeyChange = (event, otpIndex) => {
    if(event.code === 'Space' || event.key === 'Tab') {
      event.preventDefault();
      return;
    }

    if(event.key === "Backspace" && !inputRef.current[otpIndex]?.value) {
      inputRef.current[otpIndex-1]?.focus();
    }
  }

  // OTP Submit Handler
  const handleSubmit = (otp, newOtpArray) => {
    const isValid = newOtpArray.every((val) => val !== "" && !isNaN(val));

    if(isValid) {
      // call API -- scalable
      console.log("Your OTP is :- ", otp);
    }else {
      // show error notifications -- scalable
      console.log("Not every input field is filled. Please try again");
    }
  }

  return <div className="otp_container">
    <h1>OTP Input Boxes</h1>
    {otpArray.map((otpValue, index) => {
      return <input 
        type="text" 
        key={index} 
        value={otpValue} 
        ref={(otpValue) => inputRef.current[index] = otpValue}
        onChange={(e) => handleOtpChange(e.target.value, index)} 
        onKeyDown={(e) => handleKeyChange(e, index)}
      />
    })}
    <div className="radio_container">
      <input type="radio" id='manual' name="submitMode" value="MANUAL" checked={submissionMode === "MANUAL"} onChange={() => setSubmissionMode("MANUAL")} />
      <label htmlFor="manual">Manual Mode</label>
      <input type="radio" id="auto" name="submitMode" value="AUTO" checked={submissionMode === "AUTO"} onChange={() => setSubmissionMode("AUTO")} />
      <label htmlFor="auto">Automatic Mode</label>
    </div>

    <div className="submission_btn">
      {submissionMode === "MANUAL" && (
        <button onClick={() => {
          const updatedOtpArray = inputRef.current.map((input) => input?.value || ""); // preventing the stale otp array 
          handleSubmit(updatedOtpArray.join(""), updatedOtpArray)
        }}>Submit Otp</button>
      )}
    </div>

  </div>
}

export default App;