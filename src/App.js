import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import VigenerePage from '../src/components/Vigenere.jsx';
import CaesarPage from '../src/components/Ceaser.jsx';
import PublicKeyPage from '../src/components/PublicKeyDemo.jsx';
import RailFence from '../src/components/RailFence.jsx';
import SplitAndCombineDemo from './components/SplitAndCombineDemo.jsx';
import SwapDemo from './components/SwapDemo.jsx';
import SBoxDemo from './components/SBoxDemo.jsx';
import CircularShiftDemo from './components/CircularShiftDemo.jsx';
import PBoxDemo from './components/PBoxDemo.jsx';
import Shuffle from './components/Shuffle.jsx';
import XOR from './components/XORDemo.jsx';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/vigenere" element={<VigenerePage />} />
        <Route path="/caesar" element={<CaesarPage />} />
        <Route path="/publickey" element={<PublicKeyPage />} />
        <Route path="/splitcombine" element={<SplitAndCombineDemo />} />
        <Route path="/railfence" element={<RailFence />} />
        <Route path="/swap" element={<SwapDemo />} />
        <Route path="/sbox" element={<SBoxDemo />} />
        <Route path="/circularshift" element={<CircularShiftDemo />} />
        <Route path="/pbox" element={<PBoxDemo />} />
        <Route path="/shuffle" element={<Shuffle />} />
        <Route path="/xor" element={<XOR />} />
      </Routes>
    </Router>
  );
}

export default App;
