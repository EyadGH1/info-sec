import React, { useState } from "react";
import splitImage from "../assets/Untitled.jpg";

const SplitAndCombineDemo = () => {
  const [message, setMessage] = useState("");
  const [encryptedMessage, setEncryptedMessage] = useState("");
  const [decryptedMessage, setDecryptedMessage] = useState("");
  const [splitIndex, setSplitIndex] = useState(4);
  const [cipheredText, setCipheredText] = useState("");  // New state for ciphered text input

  // Helper Functions
  const splitAndCombine = (charCode, splitIndex) => {
    const binary = charCode.toString(2).padStart(8, "0");
    const part1 = binary.slice(0, splitIndex);
    const part2 = binary.slice(splitIndex);
    return part2 + part1;
  };

  const combineAndSplit = (binary, splitIndex) => {
    const part1 = binary.slice(-splitIndex);
    const part2 = binary.slice(0, -splitIndex);
    return part1 + part2;
  };

  const handleEncrypt = () => {
    const encrypted = message
      .split("")
      .map((char) => {
        const charCode = char.charCodeAt(0);
        const splitCombinedBinary = splitAndCombine(charCode, splitIndex);
        return String.fromCharCode(parseInt(splitCombinedBinary, 2));
      })
      .join("");
    setEncryptedMessage(encrypted);
  };

  const handleDecrypt = () => {
    const decrypted = cipheredText
      .split("")
      .map((char) => {
        const charCode = char.charCodeAt(0);
        const binary = charCode.toString(2).padStart(8, "0");
        const originalBinary = combineAndSplit(binary, splitIndex);
        return String.fromCharCode(parseInt(originalBinary, 2));
      })
      .join("");
    setDecryptedMessage(decrypted);
  };

  return (
    <div className="split-container">
      <h2 className="split-title">Split and Combine Encryption</h2>
      <p className="split-description">
        Split and combine encryption divides the binary representation of each
        character at a specified index, swaps the halves, and combines them.
        Decryption reverses the process.
      </p>

      <label className="split-label">
        Enter Split Index (integer):
        <input
          type="number"
          value={splitIndex}
          onChange={(e) => setSplitIndex(Number(e.target.value))}
          placeholder="Enter a split index"
          className="split-input"
        />
      </label>

      <div className="split-content">
        <div className="split-text">
          <textarea
            rows="4"
            cols="50"
            placeholder="Enter your message here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="split-textarea"
          />
          <br />

          <button
            onClick={handleEncrypt}
            disabled={!message}
            className="split-button"
          >
            Encrypt
          </button>

          {encryptedMessage && (
            <div className="split-output">
              <h4>Encrypted Message:</h4>
              <p>{encryptedMessage}</p>
            </div>
          )}
        </div>

        <img src={splitImage} alt="Split Illustration" className="split-image" />
      </div>

      {/* New input field for ciphered text (encrypted message) */}
      <div className="input-group">
        <label>
          Enter Ciphered Text for Decryption:
          <input
            type="text"
            value={cipheredText}
            onChange={(e) => setCipheredText(e.target.value)}
            placeholder="Enter encrypted message"
            className="split-input"
          />
        </label>
      </div>

      <br />
      <button
        onClick={handleDecrypt}
        disabled={!cipheredText}
        className="split-button"
      >
        Decrypt
      </button>

      {decryptedMessage && (
        <div className="split-output">
          <h4>Decrypted Message:</h4>
          <p>{decryptedMessage}</p>
        </div>
      )}
      <hr />
    </div>
  );
};

export default SplitAndCombineDemo;
