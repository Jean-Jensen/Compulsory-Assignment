import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import PaperPage from './PaperPage.tsx';
import AddPaperPage from './AddPaperPage.tsx';
import AddPropertyPage from './AddPropertyPage.tsx';
import AllOrdersPage from './AllOrdersPage.tsx';
import CartPage from './CartPage.tsx';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<App/>}/>
              <Route path="/paper/:id" element={<PaperPage/>}/>
              <Route path="/paper/add" element={<AddPaperPage/>}/>
              <Route path="/property/add" element={<AddPropertyPage/>}/>
              <Route path="/order" element={<AllOrdersPage/>}/>
              <Route path="/cart" element={<CartPage/>}/>
          </Routes>
      </BrowserRouter>
  </StrictMode>,
)
