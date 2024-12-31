import React, { useState } from "react" 
import Swap from "../assets/Swap.jpg"

const swapCharacters = (message, swapPositions) => {
  let messageArray = message.split("")  
  swapPositions.forEach(([i, j]) => {
    [messageArray[i], messageArray[j]] = [messageArray[j], messageArray[i]]  
  }) 
  return messageArray.join("")  
} 

const SwapDemo = () => {
  const [message, setMessage] = useState("") 
  const [encryptedMessage, setEncryptedMessage] = useState("") 
  const [decryptedMessage, setDecryptedMessage] = useState("") 
  const [swapPositions, setSwapPositions] = useState("0,3 1,2")  
  const parseSwapPositions = () => {
    return swapPositions
      .split(" ")
      .map(pair => pair.split(",").map(Number)) 
  } 

  async function handleEncrypt () {
    const swaps = parseSwapPositions() 
    const encrypted = swapCharacters(message, swaps)  
    setEncryptedMessage(encrypted) 
  } 

  const handleDecrypt = () => {
    const swaps = parseSwapPositions() 
    const decrypted = swapCharacters(encryptedMessage, swaps) 
    setDecryptedMessage(decrypted) 
  } 

  return (
    <div className="container">
      <h2>Swap Encryption</h2>
      <p>
        Swap encryption swaps entire characters in the message. Decryption is performed by applying the same swaps again.
      </p>
      <div className="con">
      <div>
      <label>
        Enter Swap Positions (e.g., "0,3 1,2"):
        <input
          type="text"
          value={swapPositions}
          onChange={(e) => setSwapPositions(e.target.value)}
          placeholder="Enter swap positions"
        />
      </label>

      <br />
      <textarea
        rows="4"
        cols="50"
        placeholder="Enter your message here..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <br />

      <button onClick={handleEncrypt} disabled={!message}>
        Encrypt
      </button>
      </div>
      <img src={Swap} alt="" />
      </div>
      {encryptedMessage && (
        <div>
          <h4>Encrypted Message:</h4>
          <p>{encryptedMessage}</p>
        </div>
      )}

      <br />
      <button onClick={handleDecrypt} disabled={!encryptedMessage}>
        Decrypt
      </button>

      {decryptedMessage && (
        <div>
          <h4>Decrypted Message:</h4>
          <p>{decryptedMessage}</p>
        </div>
      )}
    </div>
  ) 
} 

export default SwapDemo 
