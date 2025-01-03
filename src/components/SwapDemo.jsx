import React, { useState } from "react";
import Swap from "../assets/Swap.jpg";

const swapCharacters = (message, swapPosition) => {
  let messageArray = message.split("");
  let newMessagearray = [];
  for (let i = messageArray.length; i > swapPosition; i--) {
    newMessagearray.push(messageArray[i]);
  }
  for (let i = 0; i <= swapPosition; i++) {
    newMessagearray.push(messageArray[i]);
  }
  return newMessagearray.join("");
};

const unswapCharacters = (encryptedMessage, swapPosition) => {
  encryptedMessage = String(encryptedMessage);
  let encryptedArray = encryptedMessage.split("");
  console.log(encryptedArray);
  let part1 = [];
  let part2 = [];
  for (let i = swapPosition; i < encryptedArray.length; i++) {
    part1.push(encryptedArray[i]);
  }
  for (let i = swapPosition; i >= 0; i--) {
    part2.push(encryptedArray[i]);
  }
  return part1.join("") + part2.join("");
};

const SwapDemo = () => {
  const [message, setMessage] = useState("");
  const [encryptedMessage, setEncryptedMessage] = useState("");
  const [decryptedMessage, setDecryptedMessage] = useState("");
  const [swapPositions, setSwapPositions] = useState(0);
  const [cipheredText, setCipheredText] = useState("");  // New state for ciphered text input

  async function handleEncrypt() {
    const encrypted = swapCharacters(message, swapPositions);
    setEncryptedMessage(encrypted);
  }

  const handleDecrypt = () => {
    setDecryptedMessage(unswapCharacters(cipheredText, swapPositions));  // Using cipheredText for decryption
    console.log(decryptedMessage);
  };

  return (
    <div className="container">
      <h2>Swap Encryption</h2>
      <p>
        Swap encryption swaps entire characters in the message. Decryption is performed by applying the same swaps again.
      </p>
      <div className="con">
        <div>
          <label>
            Enter Swap Point:
            <input
              type="text"
              value={swapPositions}
              onChange={(e) => setSwapPositions(e.target.value)}
              placeholder="Enter swap position"
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

      {/* Added input field for ciphered text (encrypted message) */}
      <div>
        <label>
          Enter Ciphered Text for Decryption:
          <input
            type="text"
            value={cipheredText}
            onChange={(e) => setCipheredText(e.target.value)}
            placeholder="Enter encrypted message"
          />
        </label>
        <br />
        <button onClick={handleDecrypt} disabled={!cipheredText}>
          Decrypt
        </button>
      </div>

      {decryptedMessage && (
        <div>
          <h4>Decrypted Message:</h4>
          <p>{decryptedMessage}</p>
        </div>
      )}
    </div>
  );
};

export default SwapDemo;
