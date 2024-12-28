import React, { useRef, useState } from "react";

const Ceaser = () => {
  const [submitted, setSubmitted] = useState(false);
  const [plainText, setPlainText] = useState("");
  const [cipheredText, setCipheredText] = useState("");
  const [decryptedText, setDecryptedText] = useState("");

  const inputRef = useRef(null);

  const encryptText = (text) => {
    return text
      .split("")
      .map((char) => {
        if (char === " ") return char;
        return String.fromCharCode(char.charCodeAt(0) + 3); // Shift 3 steps forward
      })
      .join("");
  };

  const decryptText = (text) => {
    return text
      .split("")
      .map((char) => {
        if (char === " ") return char;
        return String.fromCharCode(char.charCodeAt(0) - 3); // Shift 3 steps backward
      })
      .join("");
  };

  const handleEncryptSubmit = (e) => {
    e.preventDefault();
    const text = inputRef.current.value;
    setPlainText(text);
    const encrypted = encryptText(text);
    setCipheredText(encrypted);
    setDecryptedText(""); // Clear decrypted text when re-encrypting
    setSubmitted(true);
  };

  const handleDecryptSubmit = () => {
    const decrypted = decryptText(cipheredText);
    setDecryptedText(decrypted);
  };

  return (
    <section id="ceaser-cipher">
      <h1>Caesar Cipher</h1>
      <p className="description">
        The Caesar Cipher shifts every letter of the text by 3 positions. It’s one of the simplest encryption techniques!
      </p>

      <form className="ceaser-form" onSubmit={handleEncryptSubmit}>
        <input
          type="text"
          className="ceaser-input"
          ref={inputRef}
          placeholder="Enter plain text"
        />
        <button className="ceaser-input-button" type="submit">
          Encrypt
        </button>
      </form>

      {submitted && (
        <div className="ciphered-text">
          <h2>Step-by-step Process</h2>
          <p>We take your input text and shift each letter by 3 positions. For example:</p>
          <div className="example">
            <p><strong>Original:</strong> {plainText}</p>
            <p><strong>Encrypted:</strong> {cipheredText}</p>
          </div>

          <h3>Encrypted Text: {cipheredText}</h3>
          <button className="ceaser-input-button" onClick={handleDecryptSubmit}>
            Decrypt
          </button>

          {decryptedText && (
            <div className="decrypted-text">
              <h3>Decrypted Text: {decryptedText}</h3>
              <p>
                The decrypted text matches the original text! The Caesar Cipher is easily broken if the shift is known.
              </p>
            </div>
          )}

          <div className="code-snippet">
            <h3>How It Works (Code Breakdown)</h3>
            <pre>
              {`function encryptText(text) {
  return text
    .split("")
    .map(char => {
      if (char === " ") return char;
      return String.fromCharCode(char.charCodeAt(0) + 3); // Shift forward by 3
    })
    .join("");
}`}
            </pre>
          </div>
        </div>
      )}
      <hr />
    </section>
  );
};

export default Ceaser;
