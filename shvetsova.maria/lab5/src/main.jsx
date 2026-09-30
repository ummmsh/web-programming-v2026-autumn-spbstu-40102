import React from 'react';
import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import {booksData} from '../assets/books';
import {BookTree} from './components/BookTree';
import './styles.css';

function App() {
  return <BookTree data={booksData}></BookTree>;
}

const rootElement = document.querySelector('[data-testid="app"]');

if (!rootElement) {
  throw new Error('Корневой элемент приложения не найден.');
}

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
