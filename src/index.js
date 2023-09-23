import React from 'react';

import App from './components/App';
import './index.css';

import { createRoot } from 'react-dom/client';

// Затем используйте createRoot так же, как и раньше:
const root = createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
