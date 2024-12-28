import React, { useState } from "react";

// Modular Exponentiation
const modExp = (base, exp, mod) => {
  let result = 1;
  base = base % mod; // Apply modulus to base to avoid large numbers
  while (exp > 0) {
    if (exp % 2 === 1) {
      result = (result * base) % mod; // Multiply result by base if exponent is odd
    }
    exp = Math.floor(exp / 2); // Divide exponent by 2 for next iteration
    base = (base * base) % mod; // Square the base and apply modulus
  }
  return result;
};

// Key Generation Function
const generateKeys = () => {
  const p = 17; // Prime number p
  const q = 11; // Prime number q
  const n = p * q; // n = p * q
  const phi = (p - 1) * (q - 1); // Euler's totient function φ(n)

  const e = 7; // Public exponent e (needs to be coprime with φ(n))
  let d = 1;
  while ((d * e) % phi !== 1) {
    d++; // Brute force to find d (private exponent) such that (d * e) % φ(n) = 1
  }

  return { publicKey: { e, n }, privateKey: { d, n } };
};

const PublicKeyDemo = () => {
  const [message, setMessage] = useState(""); // Holds the original message
  const [encryptedMessage, setEncryptedMessage] = useState(""); // Holds the encrypted message
  const [decryptedMessage, setDecryptedMessage] = useState(""); // Holds the decrypted message
  const [keys, setKeys] = useState(generateKeys()); // Generated keys

  // Encrypt the message using the public key
  const handleEncrypt = () => {
    const { e, n } = keys.publicKey;
    const messageChars = message.split("").map((char) => char.charCodeAt(0)); // Convert message to ASCII codes
    const encryptedChars = messageChars.map((char) => modExp(char, e, n)); // Encrypt each character
    setEncryptedMessage(encryptedChars.join(" ")); // Join encrypted characters into a string
  };

  // Decrypt the message using the private key
  const handleDecrypt = () => {
    const { d, n } = keys.privateKey;
    const encryptedChars = encryptedMessage.split(" ").map(Number); // Convert encrypted message back to numbers
    const decryptedChars = encryptedChars.map((char) => modExp(char, d, n)); // Decrypt each character
    setDecryptedMessage(
      decryptedChars.map((char) => String.fromCharCode(char)).join("") // Convert back to characters
    );
  };

  return (
    <div className="public-key-demo-container">
      <h2 className="header-title">Public Key Encryption Demo</h2>
      <p className="intro-text">
        Public Key Encryption is a form of asymmetric cryptography where each user has a pair of keys: a public key and a private key. The public key is used to encrypt messages, while the private key is used to decrypt them.
      </p>

      <div className="key-section">
        <h3 className="section-title">Generated Keys</h3>
        <p>
          <strong>Public Key (e, n):</strong> ({keys.publicKey.e}, {keys.publicKey.n})
        </p>
        <p>
          <strong>Private Key (d, n):</strong> ({keys.privateKey.d}, {keys.privateKey.n})
        </p>
      </div>

      <div className="steps-section">
        <h3 className="section-title">Steps</h3>
        <ul>
          <li>Step 1: Choose two prime numbers (p and q).</li>
          <li>Step 2: Compute n = p * q, and φ(n) = (p - 1) * (q - 1).</li>
          <li>Step 3: Choose a public exponent (e) that is coprime with φ(n).</li>
          <li>Step 4: Compute the private exponent (d) such that (d * e) % φ(n) = 1.</li>
        </ul>
      </div>

      <textarea
        className="message-input"
        rows="4"
        cols="50"
        placeholder="Enter your message here..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <br />
      <button className="action-button" onClick={handleEncrypt} disabled={!message}>
        Encrypt Message
      </button>

      {encryptedMessage && (
        <div className="result">
          <h4>Encrypted Message</h4>
          <p>{encryptedMessage}</p>
          <p>
            The message was encrypted using the public key with the formula: <strong>C = M<sup>e</sup> mod N</strong>.
            <br />
            Where C is the ciphertext, M is the plaintext message, e is the public exponent, and N is the product of two prime numbers.
          </p>
        </div>
      )}

      <br />
      <button className="action-button" onClick={handleDecrypt} disabled={!encryptedMessage}>
        Decrypt Message
      </button>

      {decryptedMessage && (
        <div className="result">
          <h4>Decrypted Message</h4>
          <p>
            The message was decrypted using the private key with the formula: <strong>M = C<sup>d</sup> mod N</strong>.
            <br />
            Where M is the original plaintext message, C is the ciphertext, d is the private exponent, and N is the product of two prime numbers.
          </p>
          <p>{decryptedMessage}</p>
        </div>
      )}
    </div>
  );
};

export default PublicKeyDemo;