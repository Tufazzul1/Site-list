import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from "react-router-dom";
import { router } from './routes/Routes';
import AuthProviders from './providers/AuthProviders';

createRoot(document.getElementById('root')).render(

  <AuthProviders>
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>,
  </AuthProviders>

)
