import React, { useState } from "react";
import DESIM from "../assets/DES.png";
import DESch from "../assets/DESchange.png";

const permute = (input, permutationTable) => {
  return permutationTable.map(index => input[index - 1]).join("");
};

const xor = (a, b) => {
  return a
    .split("")
    .map((bit, index) => (bit === b[index] ? "0" : "1"))
    .join("");
};

const feistelFunction = (right, subkey) => {
  const expandedRight = permute(right, [
    32, 1, 2, 3, 4, 5, 4, 5, 6, 7, 8, 9, 8, 9, 10, 11, 12, 13, 12, 13, 14, 15,
    16, 17, 16, 17, 18, 19, 20, 21, 20, 21,
  ]);
  const xored = xor(expandedRight, subkey);
  return permute(xored, [
    16, 7, 20, 21, 29, 12, 28, 17, 1, 15, 23, 26, 5, 18, 31, 10, 2, 8, 24, 14,
    32, 27, 3, 9, 19, 13, 30, 6, 22, 11, 4, 25,
  ]);
};

const generateKeys = key => {
  const permutedKey = permute(key, [
    57, 49, 41, 33, 25, 17, 9, 1, 58, 50, 42, 34, 26, 18, 10, 2, 59, 51, 43, 35,
    27, 19, 11, 3, 60, 52, 44, 36, 63, 55, 47, 39, 31, 23, 15, 7, 62, 54, 46, 38,
    30, 22, 14, 6, 61, 53, 45, 37, 29, 21, 13, 5, 28, 20, 12, 4,
  ]);
  const left = permutedKey.slice(0, 28);
  const right = permutedKey.slice(28);
  const roundKeys = [];

  const shifts = [1, 1, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 1];
  for (const shift of shifts) {
    const shiftedLeft = left.slice(shift) + left.slice(0, shift);
    const shiftedRight = right.slice(shift) + right.slice(0, shift);
    const combined = shiftedLeft + shiftedRight;
    roundKeys.push(
      permute(combined, [
        14, 17, 11, 24, 1, 5, 3, 28, 15, 6, 21, 10, 23, 19, 12, 4, 26, 8, 16, 7,
        27, 20, 13, 2, 41, 52, 31, 37, 47, 55, 30, 40, 51, 45, 33, 48, 44, 49,
        39, 56, 34, 53, 46, 42, 50, 36, 29, 32,
      ])
    );
  }

  return roundKeys;
};

const desEncrypt = (plaintext, key) => {
  const initialPermutation = permute(plaintext, [
    58, 50, 42, 34, 26, 18, 10, 2, 60, 52, 44, 36, 28, 20, 12, 4, 62, 54, 46, 38,
    30, 22, 14, 6, 64, 56, 48, 40, 32, 24, 16, 8, 57, 49, 41, 33, 25, 17, 9, 1,
    59, 51, 43, 35, 27, 19, 11, 3, 61, 53, 45, 37, 29, 21, 13, 5, 63, 55, 47, 39,
    31, 23, 15, 7,
  ]);
  let left = initialPermutation.slice(0, 32);
  let right = initialPermutation.slice(32);

  const keys = generateKeys(key);

  for (const subkey of keys) {
    const tempRight = right;
    right = xor(left, feistelFunction(right, subkey));
    left = tempRight;
  }

  const preOutput = right + left; 
  return permute(preOutput, [
    40, 8, 48, 16, 56, 24, 64, 32, 39, 7, 47, 15, 55, 23, 63, 31, 38, 6, 46, 14,
    54, 22, 62, 30, 37, 5, 45, 13, 53, 21, 61, 29, 36, 4, 44, 12, 52, 20, 60, 28,
    35, 3, 43, 11, 51, 19, 59, 27, 34, 2, 42, 10, 50, 18, 58, 26, 33, 1, 41, 9,
    49, 17, 57, 25,
  ]);
};

const textToBinary = (text) => {
  return text.split("").map((char) => {
    return char.charCodeAt(0).toString(2).padStart(8, "0");
  }).join("");
};


const textTo64BitBinary = (text) => {
  if (text.length !== 8) {
    return null; 
  }
  return textToBinary(text); 
};

const DESDemo = () => {
  const [message, setMessage] = useState("helloDES"); 
  const [key, setKey] = useState("eyadskey"); 
  const [encryptedMessage, setEncryptedMessage] = useState("");
  const [error, setError] = useState("");

  const handleEncrypt = () => {
    const binaryMessage = textTo64BitBinary(message);
    const binaryKey = textTo64BitBinary(key);

    if (!binaryMessage || !binaryKey) {
      alert("Both plaintext and key must be exactly 8 characters (64 bits) long.");
      return;
    }

    setError("");
    setEncryptedMessage(desEncrypt(binaryMessage, binaryKey));
  };

  return (
    <div className="container">
      <h2>DES Encryption Demo</h2>
      <p>
        Data Encryption Standard (DES) is a symmetric encryption algorithm that
        uses a 64-bit block size and a 64-bit key. Enter exactly 8 characters for plaintext and key.
      </p>
      <img src={DESIM} alt="" />
      <textarea
        rows="2"
        cols="70"
        placeholder="Enter 8-character plaintext text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <textarea
        rows="2"
        cols="70"
        placeholder="Enter 8-character key text"
        value={key}
        onChange={(e) => setKey(e.target.value)}
      />
      {error && <p style={{ color: "red" }}>{error}</p>}
      <br />
      <button onClick={handleEncrypt}>Encrypt</button>
      <div>
        <h4>Encrypted Message:</h4>
        <p>{encryptedMessage}</p>
      </div>
      <p>
        DES makes it so the least amount of change even 1 bit can lead to significant changes in the Ciphered text.
      </p>
      <img src={DESch} alt="" />
    </div>
  );
};

export default DESDemo;
