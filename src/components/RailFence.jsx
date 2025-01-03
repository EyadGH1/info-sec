import React, { useState } from "react";
import fenceImage from "../assets/fence.png";

const RailFence = () => {
  const [textToEncrypt, setTextToEncrypt] = useState(""); // Holds the original message for encryption
  const [textToDecrypt, setTextToDecrypt] = useState(""); // Holds the message to be decrypted
  const [rows, setRows] = useState(3); // Holds the number of rows
  const [encryptedText, setEncryptedText] = useState(""); // Holds the encrypted message
  const [decryptedText, setDecryptedText] = useState(""); // Holds the decrypted message

  // Encrypt the message using the Rail Fence Cipher
  const handleEncrypt = () => {
    if (rows < 2) {
      alert("Number of rows must be at least 2.");
      return;
    }

    const mat = Array.from({ length: rows }, () => []);
    let j = 0;
    let direction = 1; // 1 for down, -1 for up
    const cleanedText = textToEncrypt.replace(/\s+/g, ""); // Remove spaces
    const textArr = cleanedText.split("");

    textArr.forEach((char) => {
      mat[j].push(char);
      j += direction;

      if (j === 0 || j === rows - 1) {
        direction *= -1; // Change direction at the top or bottom row
      }
    });

    setEncryptedText(mat.map((row) => row.join("")).join(""));
  };

  // Decrypt the message using the Rail Fence Cipher
  const handleDecrypt = () => {
    if (rows < 2) {
      alert("Number of rows must be at least 2.");
      return;
    }

    const cleanedText = textToDecrypt.replace(/\s+/g, ""); // Remove spaces
    const len = cleanedText.length;
    const mat = Array.from({ length: rows }, () => Array(len).fill(null));
    let j = 0;
    let direction = 1;

    // Mark the positions in the zigzag pattern
    for (let i = 0; i < len; i++) {
      mat[j][i] = "*";
      j += direction;

      if (j === 0 || j === rows - 1) {
        direction *= -1;
      }
    }

    // Fill the marked positions with characters from the text
    let charIndex = 0;
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < len; col++) {
        if (mat[row][col] === "*") {
          mat[row][col] = cleanedText[charIndex++];
        }
      }
    }

    // Read the text in a zigzag pattern
    j = 0;
    direction = 1;
    let decrypted = "";
    for (let i = 0; i < len; i++) {
      decrypted += mat[j][i];
      j += direction;

      if (j === 0 || j === rows - 1) {
        direction *= -1;
      }
    }

    setDecryptedText(decrypted);
  };

  return (
    <div className="rail-fence-container">
      <h2 className="header-title">Rail Fence Cipher</h2>
      <p className="intro-text">
        The Rail Fence Cipher works by arranging the message in a zigzag
        pattern across a specified number of rows, then reading it row by row.
      </p>
      <img className="fence-image" src={fenceImage} alt="Rail Fence" />
      <br />
      <h3 className="try-text">Try it yourself:</h3>

      <div>
        <label htmlFor="rows">Number of Rows:</label>
        <input
          type="number"
          id="rows"
          className="rows-input"
          value={rows}
          min="2"
          onChange={(e) => setRows(Number(e.target.value))}
        />
      </div>

      <div>
        <h4>Encrypt a Message:</h4>
        <textarea
          className="message-input"
          rows="4"
          cols="50"
          placeholder="Enter your message to encrypt here..."
          value={textToEncrypt}
          onChange={(e) => setTextToEncrypt(e.target.value)}
        />
        <br />
        <button
          className="action-button"
          onClick={handleEncrypt}
          disabled={!textToEncrypt || rows < 2}
        >
          Encrypt
        </button>
      </div>

      {encryptedText && (
        <div className="encrypted-text">
          <h4>Encrypted Text:</h4>
          <p>{encryptedText}</p>
        </div>
      )}

      <div>
        <h4>Decrypt a Message:</h4>
        <textarea
          className="message-input"
          rows="4"
          cols="50"
          placeholder="Enter your message to decrypt here..."
          value={textToDecrypt}
          onChange={(e) => setTextToDecrypt(e.target.value)}
        />
        <br />
        <button
          className="action-button"
          onClick={handleDecrypt}
          disabled={!textToDecrypt || rows < 2}
        >
          Decrypt
        </button>
      </div>

      {decryptedText && (
        <div className="decrypted-text">
          <h4>Decrypted Text:</h4>
          <p>{decryptedText}</p>
        </div>
      )}

      <hr className="separator" />
    </div>
  );
};

export default RailFence;
