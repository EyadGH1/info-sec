import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const cipherData = {
  old: [
    { name: 'Vigenère Cipher', description: 'A polyalphabetic substitution cipher based on a keyword.', link: '/vigenere' },
    { name: 'Caesar Cipher', description: 'A substitution cipher where each letter is shifted by a fixed number.', link: '/caesar' },
    { name: 'Shuffle Cipher', description: 'A transposition cipher that shuffles the positions of the characters.', link: '/shuffle' },
    { name: 'Rail Fence Cipher', description: 'A transposition cipher that writes the message in a zigzag pattern.', link: '/railfence' }
  ],
  modern: [
    { name: 'P-Box', description: 'A permutation box used in cryptographic functions for bitwise operations.', link: '/pbox' },
    { name: 'S-Box', description: 'A substitution box used in symmetric key algorithms for confusion.', link: '/sbox' },
    { name: 'XOR', description: 'A logical operation used for combining bits in encryption.', link: '/xor' },
    { name: 'Swap', description: 'An operation where two data elements are exchanged.', link: '/swap' },
    { name: 'Circular Shift', description: 'A bit manipulation operation that shifts the bits in a circular manner.', link: '/circularshift' },
    { name: 'Split and Combine', description: 'Dividing data into parts and then reassembling them to increase security.', link: '/splitcombine' }
  ],
  advanced: [
    { name: 'Public Key Encryption', description: 'Encryption method that uses a pair of keys, one public and one private.', link: '/publickey' },
    { name: 'DES', description: 'Data Encryption Standard, a symmetric-key algorithm for the encryption of digital data.', link: '/des' },
    { name: 'AES', description: 'Advanced Encryption Standard, a widely used symmetric-key encryption algorithm.', link: '/aes' }
  ]
};

const Main = () => {
  return (
    <main id="main-section">
      <div className="container">
        {/* Old Ciphering Techniques Section */}
        <section className="cipher-section">
          <h2>Old Ciphering Techniques</h2>
          <div className="cipher-row">
            {cipherData.old.map((cipher, index) => (
              <div key={index} className="cipher-item">
                <h3><Link to={cipher.link}>{cipher.name}</Link></h3>
                <p>{cipher.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Modern Ciphering Techniques Section */}
        <section className="cipher-section">
          <h2>Modern Ciphering Techniques</h2>
          <div className="cipher-row">
            {cipherData.modern.map((cipher, index) => (
              <div key={index} className="cipher-item">
                <h3><Link to={cipher.link}>{cipher.name}</Link></h3>
                <p>{cipher.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Advanced Ciphering Techniques Section */}
        <section className="cipher-section">
          <h2>Product / Advanced Cipering</h2>
          <div className="cipher-row">
            {cipherData.advanced.map((cipher, index) => (
              <div key={index} className="cipher-item">
                <h3><Link to={cipher.link}>{cipher.name}</Link></h3>
                <p>{cipher.description}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
};

export default Main;
