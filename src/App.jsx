import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';

import HomePage from './pages/HomePage/HomePage';
import Header from './components/Header/Header';
import CatalogPage from './pages/CatalogPage/CatalogPage';

export default function App() {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/catalog" element={<CatalogPage />} />
                </Routes>
            </BrowserRouter>
        </Provider>
    );
};

