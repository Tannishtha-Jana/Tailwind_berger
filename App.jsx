import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Cust from './components/Cust';
import Index from './components/Index';
import Int2_full from './components/Int2_full';
import Int2_res from './components/Int2_res';
import Sku from './components/Sku';
import Menu from './components/Menu';



function App() {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/Int2_full" element={<Int2_full />} />
      <Route path="/Int2_res" element={<Int2_res />} />
      <Route path="/Menu" element={<Menu />} />
      <Route path="/Sku" element={<Sku />} />
      <Route path="/Cust" element={<Cust />} />
    </Routes>
  );
}

export default App;
