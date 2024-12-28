import React, { useState } from "react" 

// XOR Encryption/Decryption Functions
const xorEncryptDecrypt = (input, key) => {
  return input
    .split("")
    .map((char) => String.fromCharCode(char.charCodeAt(0) ^ key))
    .join("") 
} 

const XORDemo = () => {
  const [message, setMessage] = useState("") 
  const [encryptedMessage, setEncryptedMessage] = useState("") 
  const [decryptedMessage, setDecryptedMessage] = useState("") 
  const [key, setKey] = useState(0)  // Default key

  const handleEncrypt = () => {
    const encrypted = xorEncryptDecrypt(message, key) 
    setEncryptedMessage(encrypted) 
  } 

  const handleDecrypt = () => {
    const decrypted = xorEncryptDecrypt(encryptedMessage, key) 
    setDecryptedMessage(decrypted) 
  } 

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

export default XORDemo 
