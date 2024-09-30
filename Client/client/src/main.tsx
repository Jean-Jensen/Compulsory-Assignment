import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import PaperPage from './PaperPage.tsx';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
      
      <BrowserRouter>
          
          <Routes>
              
              <Route path="/" element={<App/>}/>
              <Route path="/paper/:id" element={<PaperPage/>}/>
          </Routes>
      </BrowserRouter>
  </StrictMode>,
)
