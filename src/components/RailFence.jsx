import React, { useState } from "react";
import fenceImage from "../assets/fence.png";

const RailFence = () => {
  const [text, setText] = useState(""); // Holds the original message
  const [encryptedText, setEncryptedText] = useState(""); // Holds the encrypted message
  const [decryptedText, setDecryptedText] = useState(""); // Holds the decrypted message

  // Encrypt the message using the Rail Fence Cipher
  const handleEncrypt = () => {
    const rows = 3;
    const mat = Array.from({ length: rows }, () => []);
    let j = 0;
    let last = "top";
    const res = text.replace(/\s+/g, "");
    const textArr = res.split("");

    for (let i = 0; i < textArr.length; i++) {
      mat[j][i] = textArr[i];
      if (last === "top") {
        j++;
      } else if (last === "buttom") {
        j--;
      }
      if (j === 0) {
        last = "top";
      } else if (j >= 2) {
        last = "buttom";
      }
    }

    setEncryptedText(mat.map((row) => row.join("")).join(""));
  };

  return (
    <div className="rail-fence-container">
      <h2 className="header-title">Rail Fence Cipher</h2>
      <p className="intro-text">
        Rail Fence works by distributing the message on 3 different rows, then
        reordering it starting from the top row to the 3rd.
      </p>
      <img className="fence-image" src={fenceImage} alt="Rail Fence" />
      <br />
      <h3 className="try-text">Try it yourself:</h3>
      <textarea
        className="message-input"
        rows="4"
        cols="50"
        placeholder="Enter your message here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <br />
      <button
        className="action-button"
        onClick={handleEncrypt}
        disabled={!text}
      >
        Encrypt
      </button>

      <br />
      {encryptedText && (
        <div className="encrypted-text">
          <h2>Encrypted Text:</h2>
          <p>{encryptedText}</p>
        </div>
      )}

      {decryptedText && (
        <div className="decrypted-text">
          <h2>Decrypted Text:</h2>
          <p>{decryptedText}</p>
        </div>
      )}

      <hr className="separator" />
    </div>
  );
};

export default RailFence;
