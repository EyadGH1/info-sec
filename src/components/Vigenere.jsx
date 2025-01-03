import React, { useRef, useState, useEffect } from 'react';

const Vigenere = () => {
  const plain = useRef(null);
  const key = useRef(null);
  const customCipheredInput = useRef(null); // New ref for custom encrypted input
  const [cipheredText, setCipheredText] = useState("");
  const [decryptedText, setDecryptedText] = useState("");
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  const findIndexInAlpha = (x) => {
    for (let i = 0; i < alphabet.length; i++) {
      if (x === alphabet[i]) {
        return i;
      }
    }
  };

  const generateTable = () => {
    return alphabet.map((_, rowIndex) =>
      alphabet.map(
        (_, colIndex) => alphabet[(rowIndex + colIndex) % alphabet.length]
      )
    );
  };

  const [table, setTable] = useState([]);

  useEffect(() => {
    const generatedTable = generateTable();
    setTable(generatedTable);
  }, []);

  const cipher = (e) => {
    e.preventDefault();
    let plainText = (plain.current.value.toUpperCase()).replace(/\s+/g, "");
    let keyText = key.current.value.toUpperCase();
    
    if (plainText.length > keyText.length) {
      const factor = Math.ceil(plainText.length / keyText.length);
      keyText = keyText.repeat(factor);
    }

    let ciphered = "";

    for (let i = 0; i < plainText.length; i++) {
      let rowIn = findIndexInAlpha(keyText[i]);
      let colIn = findIndexInAlpha(plainText[i]);
      if (rowIn !== undefined && colIn !== undefined) {
        ciphered += table[rowIn][colIn];
      }
    }

    setCipheredText(ciphered);
    setDecryptedText(""); // Clear decrypted text when re-encrypting
  };

  const decrypt = (e) => {
    e.preventDefault();
    const cipherText = customCipheredInput.current.value.toUpperCase().replace(/\s+/g, ""); // Use input value
    let keyText = key.current.value.toUpperCase();
    
    if (cipherText.length > keyText.length) {
      const factor = Math.ceil(cipherText.length / keyText.length);
      keyText = keyText.repeat(factor);
    }

    let decrypted = "";

    for (let i = 0; i < cipherText.length; i++) {
      let rowIn = findIndexInAlpha(keyText[i]);
      let colIn = table[rowIn]?.indexOf(cipherText[i]);
      if (rowIn !== undefined && colIn !== undefined) {
        decrypted += alphabet[colIn];
      }
    }

    setDecryptedText(decrypted);
  };

  return (
    <section id='Vigenere-cipher'>
      <div className="container">
        <h1>Vigenère Cipher</h1>
        <h3>Using this table, we take the row position from a keyword that is agreed on and the column position from the plaintext</h3>
        <div>
          <table border="1" style={{ borderCollapse: 'collapse', width: '60%', height: "60%", fontSize: "8px" }}>
            <tbody>
              {table.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((cell, colIndex) => (
                    <td key={colIndex} style={{ textAlign: 'center', padding: '2px', border: '1px solid black' }}>
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <h3>Try it yourself!</h3>
        <form onSubmit={cipher}>
          <label htmlFor="plain-text-input">Enter Plain Text:</label>
          <input type="text" className='plain-text-input' ref={plain} />
          <label htmlFor="key-input">Enter Key:</label>
          <input type="text" className='key-input' ref={key} />
          <button className="ceaser-input-button" type="submit">Encrypt</button>
        </form>

        <h2>Encrypted Text: {cipheredText}</h2>

        <h3>Decrypt a Ciphered Text</h3>
        <form onSubmit={decrypt}>
          <label htmlFor="ciphered-input">Enter Ciphered Text:</label>
          <input type="text" className='ciphered-input' ref={customCipheredInput} />
          <button className="ceaser-input-button" type="submit">Decrypt</button>
        </form>

        {decryptedText && (
          <>
            <h2>Decrypted Text: {decryptedText}</h2>
          </>
        )}
      </div>
      <hr />
    </section>
  );
};

export default Vigenere;
