import React, { useState, useRef } from "react";

const Shuffle = () => {
  const [cipheredText, setCipheredText] = useState(""); // Holds the encrypted text
  const [decryptedText, setDecryptedText] = useState(""); // Holds the decrypted text
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""); // Alphabet for mapping
  const keyRef = useRef(null); // Reference for the key input
  const textRef = useRef(null); // Reference for the text input (can be plain or ciphered)

  const createMapping = (key) => {
    const dict = {};
    for (let i = 0; i < 26; i++) {
      dict[alphabet[i]] = key[i];
    }
    return dict;
  };

  const createReverseMapping = (key) => {
    const dict = {};
    for (let i = 0; i < 26; i++) {
      dict[key[i]] = alphabet[i];
    }
    return dict;
  };

  const encrypt = (e) => {
    e.preventDefault();
    const key = keyRef.current.value.toUpperCase();
    const plainText = textRef.current.value.toUpperCase();

    if (key.length !== 26 || new Set(key).size !== 26) {
      alert("The key must be exactly 26 unique characters.");
      return;
    }

    const dict = createMapping(key);
    const ciphered = plainText
      .split("")
      .map((char) => dict[char] || char) // Replace or leave unchanged if not in the alphabet
      .join("");

    setCipheredText(ciphered);
    setDecryptedText(""); // Reset decrypted text
  };

  const decrypt = (e) => {
    e.preventDefault();
    const key = keyRef.current.value.toUpperCase();
    const ciphered = textRef.current.value.toUpperCase();

    if (key.length !== 26 || new Set(key).size !== 26) {
      alert("The key must be exactly 26 unique characters.");
      return;
    }

    const reverseDict = createReverseMapping(key);
    console.log(reverseDict)
    const decrypted = ciphered
      .split("")
      .map((char) => reverseDict[char] || char)
      .join("");

    setDecryptedText(decrypted);
    setCipheredText(""); // Reset ciphered text
  };

  return (
    <section id="shuffle" className="shuffle-container">
      <h2 className="header-title">Shuffle Cipher</h2>
      <p className="intro-text">
        A Shuffle Cipher uses a key with 26 unique letters to substitute each
        letter of the alphabet with another. Enter a valid key and your text to
        encrypt or decrypt.
      </p>
      <form className="shuffle-form">
        <div className="form-group">
          <label htmlFor="key" className="form-label">
            Enter a key with 26 unique letters:
          </label>
          <input
            type="text"
            id="key"
            ref={keyRef}
            className="input-field"
            placeholder="e.g., QWERTYUIOPASDFGHJKLZXCVBNM"
          />
        </div>

        <div className="form-group">
          <label htmlFor="text" className="form-label">
            Enter text to cipher or decipher:
          </label>
          <input
            type="text"
            id="text"
            ref={textRef}
            className="input-field"
            placeholder="e.g., HELLO or Ciphered Text"
          />
        </div>

        <div className="button-group">
          <button type="button" onClick={encrypt} className="action-button">
            Encrypt
          </button>
          {/* <button type="button" onClick={decrypt} className="action-button">
            Decrypt
          </button> */}
        </div>
      </form>

      {cipheredText && (
        <div className="result-box">
          <h4>Ciphered Text:</h4>
          <p>{cipheredText}</p>
        </div>
      )}

      {decryptedText && (
        <div className="result-box">
          <h4>Decrypted Text:</h4>
          <p>{decryptedText}</p>
        </div>
      )}
      <hr />
    </section>
  );
};

export default Shuffle;
