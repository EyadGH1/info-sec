import React, { useState } from "react";
import pBox from "../assets/pBox.png";

// Function to apply P-Box permutation based on the given pattern
const applyPBox = (input, permutation) => {
  return input
    .split("") // Split input into individual characters
    .map((_, i) => input[permutation[i]]) // Map each character to its new position as defined by permutation
    .join(""); // Join the characters back together
};

const PBoxDemo = () => {
  const [message, setMessage] = useState(""); // Holds the original message for encryption
  const [textToDecrypt, setTextToDecrypt] = useState(""); // Holds the message to be decrypted
  const [encryptedMessage, setEncryptedMessage] = useState(""); // Holds the encrypted message
  const [decryptedMessage, setDecryptedMessage] = useState(""); // Holds the decrypted message
  const [pattern, setPattern] = useState("3,0,2,1"); // Default permutation pattern

  // Encrypt the message by applying the P-Box permutation
  const handleEncrypt = () => {
    const permutation = pattern.split(",").map(Number); // Convert the pattern to an array of numbers
    if (message.length !== permutation.length) {
      alert(`Message length must be exactly ${permutation.length} characters.`); // Check if message length matches pattern length
      return;
    }
    const encrypted = applyPBox(message, permutation); // Apply the P-Box encryption
    setEncryptedMessage(encrypted); // Set the encrypted message
  };

  // Decrypt the message by applying the inverse of the P-Box permutation
  const handleDecrypt = () => {
    const permutation = pattern.split(",").map(Number);
    const inversePermutation = permutation.map((_, i) => permutation.indexOf(i)); // Calculate the inverse permutation
    if (textToDecrypt.length !== permutation.length) {
      alert(`Message length must be exactly ${permutation.length} characters.`); // Check if the message length matches pattern length
      return;
    }
    const decrypted = applyPBox(textToDecrypt, inversePermutation); // Apply inverse P-Box encryption
    setDecryptedMessage(decrypted); // Set the decrypted message
  };

  return (
    <div className="pbox-demo-container">
      <h2 className="header">P-Box Encryption Demo</h2>
      <p className="description">
        A Permutation Box (P-box) is a cryptographic primitive used to permute bits
        or characters in a message. It helps to achieve diffusion by shuffling the
        input according to a predefined pattern. Try encrypting and decrypting your
        message with a custom P-box pattern.
      </p>

      <div className="input-group">
        <label>Enter Permutation Pattern (comma-separated):</label>
        <input
          type="text"
          value={pattern}
          onChange={(e) => setPattern(e.target.value)}
          placeholder="e.g., 3,0,2,1"
        />
      </div>

      <div className="input-group">
        <label>Enter Your Message to Encrypt:</label>
        <textarea
          rows="4"
          cols="50"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Enter your message here..."
        />
      </div>

      <div className="input-group">
        <label>Enter Your Message to Decrypt:</label>
        <textarea
          rows="4"
          cols="50"
          value={textToDecrypt}
          onChange={(e) => setTextToDecrypt(e.target.value)}
          placeholder="Enter your encrypted message here..."
        />
      </div>

      <div className="pbox-image">
        <img src={pBox} alt="P-Box Example" />
      </div>

      <div className="buttons">
        <button onClick={handleEncrypt} disabled={!message || !pattern}>
          Encrypt
        </button>

        {encryptedMessage && (
          <div className="encrypted-message">
            <h4>Encrypted Message:</h4>
            <p>{encryptedMessage}</p>
          </div>
        )}

        <button onClick={handleDecrypt} disabled={!textToDecrypt || !pattern}>
          Decrypt
        </button>

        {decryptedMessage && (
          <div className="decrypted-message">
            <h4>Decrypted Message:</h4>
            <p>{decryptedMessage}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PBoxDemo;
