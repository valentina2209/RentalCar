import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFilters } from "../../redux/cars/carsSlice";
import { fetchCars } from "../../redux/cars/carsOperations";
import css from "./Filters.module.css"



const selectUniqueBrands = (state) => state.cars.uniqueBrands;
const selectUniquePrices = (state) => state.cars.uniquePrices;

export default function Filters() {
    const dispatch = useDispatch();
    const uniqueBrands = useSelector(selectUniqueBrands);
    const uniquePrices = useSelector(selectUniquePrices);

    const [brand, setBrand] = useState("");
    const [price, setPrice] = useState("");
    const [mileageFrom, setMileageFrom] = useState("");
    const [mileageTo, setMileageTo] = useState("");

    useEffect(() => {
        if (uniqueBrands.length === 0) {
            dispatch(fetchCars());
        }
    }, [dispatch, uniqueBrands]);



    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(setFilters({ brand, price, mileageFrom, mileageTo }));
        dispatch(fetchCars({ brand, price, mileageFrom, mileageTo }));
    };

    return (
        <form className={css.wrapper} onSubmit={handleSubmit}>
            <div className={css.container}>

                <div className={css.brand}>
                    <h2 className={css.title}>Car brand</h2>
                    <svg className={css.icon}>
                        <use href="/icons.svg#icon-down-arrow" />
                    </svg>
                    <select className={css.style} value={brand} onChange={(e) => setBrand(e.target.value)}>

                        <option value="">Choose a brand</option>
                        {uniqueBrands.map((brand) => (
                            <option key={brand} value={brand}>
                                {brand}
                            </option>
                        ))}
                    </select>

                </div>
                <div className={css.price}>
                    <h2 className={css.title}>Price/ 1 hour</h2>
                    <svg className={css.icon}>
                        <use href="/icons.svg#icon-down-arrow" />
                    </svg>
                    <select className={css.style} value={price} onChange={(e) => setPrice(e.target.value)}>
                        <option value="">Choose price</option>

                        {uniquePrices.map((price) => (
                            <option key={price} value={price}>
                                {price}
                            </option>
                        ))}
                    </select>

                </div>
            </div>



            <div className={css.mileage}>
                <h2 className={css.title}>Сar mileage / km</h2>
                <input className={css.type}
                    type="number"
                    placeholder="From"
                    value={mileageFrom}
                    onChange={(e) => setMileageFrom(e.target.value)}
                />
                <input className={css.type}
                    type="number"
                    placeholder="To"
                    value={mileageTo}
                    onChange={(e) => setMileageTo(e.target.value)}
                />
            </div>


            <button className={css.buttonStyle} type="submit">Search</button>
        </form>
    );
}
