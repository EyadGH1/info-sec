import React, { useState } from "react";

// S-box Encryption/Decryption Functions
const applySBox = (input, sBox) => {
  return input
    .split("")
    .map((char) => sBox[char] || char)
    .join("");
};

const SBoxDemo = () => {
  const [message, setMessage] = useState(""); 
  const [encryptedMessage, setEncryptedMessage] = useState(""); 
  const [decryptedMessage, setDecryptedMessage] = useState(""); 
  const [sBox, setSBox] = useState({ a: "b", b: "c", c: "d", d: "a" }); 
  const [inverseSBox, setInverseSBox] = useState({ b: "a", c: "b", d: "c", a: "d" }); 

  const handleEncrypt = () => {
    const encrypted = applySBox(message, sBox);
    setEncryptedMessage(encrypted);
  };


  const handleDecrypt = () => {
    const decrypted = applySBox(encryptedMessage, inverseSBox);
    setDecryptedMessage(decrypted);
  };

  const handleSBoxInput = (e) => {
    try {
      const newSBox = JSON.parse(e.target.value);
      const newInverseSBox = Object.fromEntries(
        Object.entries(newSBox).map(([key, value]) => [value, key])
      );
      setSBox(newSBox);
      setInverseSBox(newInverseSBox);
    } catch (err) {
      alert("Invalid S-box format. Please provide a valid JSON object.");
    }
  };

  return (
    <div className="sbox-container">
      <h2 className="header-title">S-Box Encryption</h2>
      <p className="intro-text">
        A Substitution Box (S-box) is a cryptographic primitive used to substitute
        characters in a message. This process adds confusion to the data by
        replacing input characters with predefined substitutions.
      </p>

      <label className="sbox-label">
        <strong>Enter S-Box (JSON format):</strong>
        <textarea
          className="sbox-input"
          rows="4"
          cols="50"
          defaultValue={JSON.stringify(sBox, null, 2)}
          onBlur={handleSBoxInput}
          placeholder='{ "a": "b", "b": "c", "c": "d", "d": "a" }'
        />
      </label>

      <h3 className="try-text">Try it Yourself</h3>
      <textarea
        className="message-input"
        rows="4"
        cols="50"
        placeholder="Enter your message here..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <br />

      <button className="action-button" onClick={handleEncrypt} disabled={!message || !sBox}>
        Encrypt
      </button>

      {encryptedMessage && (
        <div className="result-box">
          <h4>Encrypted Message:</h4>
          <p>{encryptedMessage}</p>
          <p>
            This is the result of applying the S-box transformation. Each character in
            the input was replaced based on the S-box mapping.
          </p>
        </div>
      )}

      <button className="action-button" onClick={handleDecrypt} disabled={!encryptedMessage || !inverseSBox}>
        Decrypt
      </button>

      {decryptedMessage && (
        <div className="result-box">
          <h4>Decrypted Message:</h4>
          <p>{decryptedMessage}</p>
          <p>
            The decryption was performed using the inverse S-box, reversing the
            transformations to recover the original message.
          </p>
        </div>
      )}
    </div>
  );
};

export default SBoxDemo;
