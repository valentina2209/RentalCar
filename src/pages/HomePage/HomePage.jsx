import React from 'react';
import { useNavigate } from 'react-router-dom';
import css from './HomePage.module.css';

const HomePage = () => {
    const navigate = useNavigate();

    const handleNavigateToCatalog = () => {
        navigate('/catalog');
    };

    return (
        <div className={css.homePageContainer}>
            <h1 className={css.title}>Find your perfect rental car</h1>
            <p className={css.subtitle}>Reliable and budget-friendly rentals for any journey</p>
            <button className={css.actionButton} onClick={handleNavigateToCatalog}>
                View Catalog
            </button>
        </div>
    );
};

export default HomePage;