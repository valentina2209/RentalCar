import { Link } from "react-router-dom";
import styles from "./CarCard.module.css";

export default function CarCard({ car }) {
    const { id, make, model, year, rentalPrice, mileage, img } = car;

    return (
        <div className={styles.card}>
            <img src={img} alt={`${make} ${model}`} className={styles.image} />
            <div className={styles.info}>
                <h3>{make} {model}, {year}</h3>
                <p>Price: {rentalPrice}</p>
                <p>Mileage: {mileage.toLocaleString()} km</p>
                <Link to={`/catalog/${id}`} className={styles.link}>
                    Read more
                </Link>
            </div>
        </div>
    );
}
