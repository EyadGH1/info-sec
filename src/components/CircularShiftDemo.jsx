import React, { useState } from "react";

// Circular Bitwise Shift Encryption/Decryption Functions
const circularBitShift = (charCode, shift, direction) => {
  const bits = 8;  // Assuming 8-bit ASCII characters
  shift = shift % bits;
  if (direction === "right") {
    return ((charCode >>> shift) | (charCode << (bits - shift))) & 0xFF;
  } else {
    return ((charCode << shift) | (charCode >>> (bits - shift))) & 0xFF;
  }
};

const CircularBitShiftDemo = () => {
  const [message, setMessage] = useState("");
  const [encryptedMessage, setEncryptedMessage] = useState("");
  const [decryptedMessage, setDecryptedMessage] = useState("");
  const [shift, setShift] = useState(1);  // Default shift
  const [direction, setDirection] = useState("right");  // Default direction
  const [cipheredText, setCipheredText] = useState("");  // New state for ciphered text input

  const handleEncrypt = () => {
    const encrypted = message
      .split("")
      .map((char) => {
        const charCode = char.charCodeAt(0);
        return String.fromCharCode(circularBitShift(charCode, shift, direction));
      })
      .join("");
    setEncryptedMessage(encrypted);
  };

  const handleDecrypt = () => {
    const oppositeDirection = direction === "right" ? "left" : "right";
    const decrypted = cipheredText
      .split("")
      .map((char) => {
        const charCode = char.charCodeAt(0);
        return String.fromCharCode(circularBitShift(charCode, shift, oppositeDirection));
      })
      .join("");
    setDecryptedMessage(decrypted);
  };

  return (
    <div className="circular-bit-shift-container">
      <h2 className="header">Circular Bitwise Shift Encryption</h2>
      <p className="description">
        Circular bitwise shift encryption rotates the bits of each character in
        a message by a specified number of positions either to the left or to
        the right. Decryption is performed by rotating the bits in the opposite
        direction.
      </p>

      <div className="input-group">
        <label>
          Shift Amount (integer):
          <input
            type="number"
            value={shift}
            onChange={(e) => setShift(Number(e.target.value))}
            placeholder="Enter a shift amount"
            min="1"
          />
        </label>
      </div>

      <div className="input-group">
        <label>
          Direction:
          <select
            value={direction}
            onChange={(e) => setDirection(e.target.value)}
          >
            <option value="right">Right</option>
            <option value="left">Left</option>
          </select>
        </label>
      </div>

      <div className="input-group">
        <textarea
          rows="4"
          cols="50"
          placeholder="Enter your message here..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>

      <div className="buttons">
        <button className="encrypt-btn" onClick={handleEncrypt} disabled={!message}>
          Encrypt
        </button>

        {encryptedMessage && (
          <div className="encrypted-message">
            <h4>Encrypted Message:</h4>
            <p>{encryptedMessage}</p>
          </div>
        )}

        <button className="decrypt-btn" onClick={handleDecrypt} disabled={!cipheredText}>
          Decrypt
        </button>

        {/* New input field for ciphered text (encrypted message) */}
        <div className="input-group">
          <label>
            Enter Ciphered Text for Decryption:
            <input
              type="text"
              value={cipheredText}
              onChange={(e) => setCipheredText(e.target.value)}
              placeholder="Enter encrypted message"
            />
          </label>
        </div>

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

export default CircularBitShiftDemo;
