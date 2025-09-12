import { useState } from "react";
import css from "./Filters.module.css";
import { useSelector } from "react-redux";
import { selectUniqueBrands, selectUniquePrices } from "../../redux/cars/carsSelectors";

export default function Filters({ onChange }) {
    const [brand, setBrand] = useState("");
    const [price, setPrice] = useState("");
    const [mileageFrom, setMileageFrom] = useState("");
    const [mileageTo, setMileageTo] = useState("");

    const brands = useSelector(selectUniqueBrands);
    const prices = useSelector(selectUniquePrices)

    const handleSubmit = (e) => {
        e.preventDefault();
        onChange({ brand, price, mileageFrom, mileageTo });
    };

    return (
        <form className={css.wrapper} onSubmit={handleSubmit}>
            <div className={css.container}>
                <div className={css.brand}>
                    <h2 className={css.title}>Car brand</h2>
                    <svg className={css.icon}>
                        <use href="/icons.svg#icon-down-arrow" />
                    </svg>
                    <select
                        className={css.style}
                        value={brand}
                        onChange={(e) => setBrand(e.target.value)}
                    >
                        <option value="">Choose a brand</option>
                        {(brands || []).map((b) => (
                            <option key={b} value={b}>
                                {b}
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
                        {(prices || []).map((p) => (
                            <option key={p} value={p}>
                                {p}
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
