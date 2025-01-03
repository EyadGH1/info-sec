import React, { useState } from "react";

// S-box Encryption/Decryption Functions
const applySBox = (input, sBox) => {
  return input
    .split("")
    .map((char) => sBox[char] || char)
    .join("");
};

const SBoxDemo = () => {
  const [message, setMessage] = useState(""); // Holds the original message for encryption
  const [textToDecrypt, setTextToDecrypt] = useState(""); // Holds the message to decrypt directly
  const [encryptedMessage, setEncryptedMessage] = useState(""); // Holds the encrypted message
  const [decryptedMessage, setDecryptedMessage] = useState(""); // Holds the decrypted message
  const [directDecryptedMessage, setDirectDecryptedMessage] = useState(""); // Holds the directly decrypted message
  const [sBox, setSBox] = useState({ a: "b", b: "c", c: "d", d: "a" }); // S-box for encryption
  const [inverseSBox, setInverseSBox] = useState({ b: "a", c: "b", d: "c", a: "d" }); // Inverse S-box for decryption

  // Encrypt the message
  const handleEncrypt = () => {
    const encrypted = applySBox(message, sBox);
    setEncryptedMessage(encrypted);
  };

  // Decrypt the encrypted message
  const handleDecrypt = () => {
    const decrypted = applySBox(encryptedMessage, inverseSBox);
    setDecryptedMessage(decrypted);
  };

  // Decrypt a directly entered message
  const handleDirectDecrypt = () => {
    const decrypted = applySBox(textToDecrypt, inverseSBox);
    setDirectDecryptedMessage(decrypted);
  };

  // Handle input for S-box
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
        placeholder="Enter your message to encrypt..."
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
        </div>
      )}

      <button className="action-button" onClick={handleDecrypt} disabled={!encryptedMessage || !inverseSBox}>
        Decrypt Encrypted Message
      </button>

      {decryptedMessage && (
        <div className="result-box">
          <h4>Decrypted Message:</h4>
          <p>{decryptedMessage}</p>
        </div>
      )}

      <h3 className="try-text">Decrypt a Custom Message</h3>
      <textarea
        className="message-input"
        rows="4"
        cols="50"
        placeholder="Enter your encrypted message here..."
        value={textToDecrypt}
        onChange={(e) => setTextToDecrypt(e.target.value)}
      />
      <br />

      <button className="action-button" onClick={handleDirectDecrypt} disabled={!textToDecrypt || !inverseSBox}>
        Decrypt Custom Message
      </button>

      {directDecryptedMessage && (
        <div className="result-box">
          <h4>Directly Decrypted Message:</h4>
          <p>{directDecryptedMessage}</p>
        </div>
      )}
    </div>
  );
};

export default SBoxDemo;
