import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite } from "../../redux/cars/carsSlice";
import { selectFavorites } from "../../redux/cars/carsSelectors.js"
import HeartIcon from "../HeartIcon/HeartIcon.jsx";
import { Link } from "react-router-dom";
import css from "./CarCard.module.css";

export default function CarCard({ car }) {
    const { id, year, brand, model, img, rentalPrice, rentalCompany, type, mileage, } = car;
    const addressParts = car.address.split(', ');
    const city = addressParts[1];
    const country = addressParts[2];

    const dispatch = useDispatch();
    const favorites = useSelector(selectFavorites);
    const isFavorite = favorites.includes(car.id);

    const handleFavoriteClick = () => {
        dispatch(toggleFavorite(car.id));
    }

    const formatter = new Intl.NumberFormat("en-US", {
        useGrouping: true,
        groupingSeparator: " ",
    });
    const formattedMileage = formatter.format(mileage);

    return (
        <div className={css.cardContainer}>
            <div className={css.imageWrapper}>
                <img src={img} alt={`${brand} ${model}`} className={css.carImage} />
                <button
                    className={`${css.favoritesBtn} ${isFavorite ? css.active : ""}`}
                    onClick={handleFavoriteClick}
                >
                    <HeartIcon className={css.icon} />
                </button>
            </div>

            <div className={css.carInfo}>
                <div className={css.wrapper}>
                    <h3 className={css.infoText}>
                        <span className={css.brand}>{brand} </span>
                        <span className={css.model}> {model}</span>,{year}
                    </h3>
                    <p className={css.rentalPrice}> ${rentalPrice}</p>
                </div>


                <p className={css.detailsList}> {city} | {country} | {rentalCompany} | </p>
                <p className={css.description}> {type} | {formattedMileage} km</p>
            </div>

            <Link to={`/catalog/${id}`} className={css.link}>
                Read more
            </Link>
        </div>
    );
}

