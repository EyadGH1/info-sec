import React, { useState } from "react";

const xorEncryptDecrypt = (input, key) => {
  return input
    .split("")
    .map((char) => String.fromCharCode(char.charCodeAt(0) ^ key))
    .join("");
};

const XORDemo = () => {
  const [message, setMessage] = useState(""); // Message to encrypt
  const [textToDecrypt, setTextToDecrypt] = useState(""); // Text to decrypt directly
  const [encryptedMessage, setEncryptedMessage] = useState(""); // Encrypted message
  const [decryptedMessage, setDecryptedMessage] = useState(""); // Decrypted message
  const [directDecryptedMessage, setDirectDecryptedMessage] = useState(""); // Directly decrypted message
  const [key, setKey] = useState(); // Encryption/Decryption key

  const handleEncrypt = () => {
    const encrypted = xorEncryptDecrypt(message, key);
    setEncryptedMessage(encrypted);
  };

  const handleDecrypt = () => {
    const decrypted = xorEncryptDecrypt(encryptedMessage, key);
    setDecryptedMessage(decrypted);
  };

  const handleDirectDecrypt = () => {
    const decrypted = xorEncryptDecrypt(textToDecrypt, key);
    setDirectDecryptedMessage(decrypted);
  };

  return (
    <div className="container">
      <h2>XOR Encryption</h2>
      <p>
        XOR encryption is a symmetric encryption technique that uses the XOR
        logical operation. It applies a key to the input data to produce the
        encrypted output, and the same key is used to decrypt it.
      </p>

      <label>
        Enter XOR Key (integer):
        <input
          type="text"
          value={key}
          onChange={(e) => setKey(Number(e.target.value))}
          placeholder="Enter a numeric key"
        />
      </label>

      <h3>Encrypt a Message</h3>
      <textarea
        rows="4"
        cols="50"
        placeholder="Enter your message here..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <br />

      <button onClick={handleEncrypt} disabled={!message || !key}>
        Encrypt
      </button>

      {encryptedMessage && (
        <div>
          <h4>Encrypted Message:</h4>
          <p>{encryptedMessage}</p>
        </div>
      )}

      <h3>Decrypt a Custom Message</h3>
      <textarea
        rows="4"
        cols="50"
        placeholder="Enter text to decrypt..."
        value={textToDecrypt}
        onChange={(e) => setTextToDecrypt(e.target.value)}
      />
      <br />

      <button onClick={handleDirectDecrypt} disabled={!textToDecrypt || !key}>
        Decrypt Custom Message
      </button>

      {directDecryptedMessage && (
        <div>
          <h4>Directly Decrypted Message:</h4>
          <p>{directDecryptedMessage}</p>
        </div>
      )}
    </div>
  );
};

export default XORDemo;
