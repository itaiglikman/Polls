import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import 'notyf/notyf.min.css';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
    <MantineProvider>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </MantineProvider>
)
