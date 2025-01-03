import React, { useState } from "react";

// Modular Exponentiation
const modExp = (base, exp, mod) => {
  let result = 1;
  base = base % mod;
  while (exp > 0) {
    if (exp % 2 === 1) {
      result = (result * base) % mod;
    }
    exp = Math.floor(exp / 2);
    base = (base * base) % mod;
  }
  return result;
};

// Function to generate keys based on user input for p and q
const generateKeys = (p, q) => {
  const n = p * q;
  const phi = (p - 1) * (q - 1);

  // Choose e such that it is coprime with phi
  let e = 2;
  while (e < phi) {
    if (gcd(e, phi) === 1) break;
    e++;
  }

  // Compute d such that (d * e) % phi === 1
  let d = 1;
  while ((d * e) % phi !== 1) {
    d++;
  }

  return { publicKey: { e, n }, privateKey: { d, n } };
};

// Function to compute gcd (Greatest Common Divisor)
const gcd = (a, b) => {
  if (b === 0) return a;
  return gcd(b, a % b);
};

const PublicKeyDemo = () => {
  const [message, setMessage] = useState(""); // Holds the original message
  const [encryptedMessage, setEncryptedMessage] = useState(""); // Holds the encrypted message
  const [decryptedMessage, setDecryptedMessage] = useState(""); // Holds the decrypted message
  const [p, setP] = useState(17); // User input for prime p
  const [q, setQ] = useState(11); // User input for prime q
  const [keys, setKeys] = useState(generateKeys(p, q)); // Initial keys based on default primes

  // Encrypt the message using the public key
  const handleEncrypt = () => {
    const { e, n } = keys.publicKey;
    const messageChars = message.split("").map((char) => char.charCodeAt(0));
    const encryptedChars = messageChars.map((char) => modExp(char, e, n));
    setEncryptedMessage(encryptedChars.map((char) => String.fromCharCode(char)).join(""));
  };

  // Decrypt the message using the private key
  const handleDecrypt = () => {
    const { d, n } = keys.privateKey;
    const encryptedChars = encryptedMessage.split("").map((char) => char.charCodeAt(0)); // Convert encrypted message back to numbers
    const decryptedChars = encryptedChars.map((char) => modExp(char, d, n)); // Decrypt each character
    setDecryptedMessage(decryptedChars.map((char) => String.fromCharCode(char)).join("")); // Convert back to characters
  };

  // Handle the generation of new keys based on new primes
  const handleGenerateKeys = () => {
    const newKeys = generateKeys(p, q);
    setKeys(newKeys);
    setEncryptedMessage(""); // Reset encrypted message when keys are changed
    setDecryptedMessage(""); // Reset decrypted message when keys are changed
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

      {/* Input fields for primes p and q */}
      <div className="prime-inputs">
        <label>
          Prime p:
          <input
            type="number"
            value={p}
            onChange={(e) => setP(Number(e.target.value))}
          />
        </label>
        <label>
          Prime q:
          <input
            type="number"
            value={q}
            onChange={(e) => setQ(Number(e.target.value))}
          />
        </label>
        <button onClick={handleGenerateKeys}>Generate Keys</button>
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
        </div>
      )}

      <br />
      <button className="action-button" onClick={handleDecrypt} disabled={!encryptedMessage}>
        Decrypt Message
      </button>

      {decryptedMessage && (
        <div className="result">
          <h4>Decrypted Message</h4>
          <p>{decryptedMessage}</p>
        </div>
      )}
    </div>
  );
};

export default PublicKeyDemo;
