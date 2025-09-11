import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchCarById } from "../../redux/cars/carsOperations";
import BookingForm from "../../components/BookingForm/BookingForm";
import css from "./CarDetailsPage.module.css";

const CarDetailsPage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { items, isLoading, error } = useSelector((state) => state.cars);

    const car = items.find((item) => String(item.id) === id);



    useEffect(() => {
        if (!car) {
            dispatch(fetchCarById(id));
        }
    }, [car, id, dispatch]);

    if (isLoading) return <p>Loading car details...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!car) return <p>No car found.</p>;

    const addressParts = car.address.split(', ');
    const city = addressParts[1];
    const country = addressParts[2];

    const mileage = car.mileage;
    const formatter = new Intl.NumberFormat("en-US", {
        useGrouping: true,
        groupingSeparator: " ",
    });
    const formattedMileage = formatter.format(mileage);
    const shortId = car.id.toString().slice(-4);


    return (
        <div className={css.carDetailsContainer}>
            <div className={css.formWrapper}>
                <div className={css.imageWrapper}>
                    <img
                        src={car.img}
                        alt={`${car.brand} ${car.model}`}
                        className={css.carImage}
                    />
                </div>
                <BookingForm />
            </div>


            <div className={css.descriptionWrapper}>

                <h2 className={css.title}>
                    {car.brand} {car.model}, {car.year} <span className={css.styleId}>id: {shortId}</span>
                </h2>

                <div className={css.navWrapper}>
                    <svg className={css.icon} width="16"
                        height="16">
                        <use href={`/icons.svg#icon-mark`} />
                    </svg>
                    <p className={css.text}>
                        {city}, {country}  Mileage: {formattedMileage} km
                    </p>
                </div>

                <p className={css.price}>${car.rentalPrice}</p>
                <p className={css.description}>{car.description}</p>

                <div className={css.listWrapper}>
                    <section>
                        <h3 className={css.subtitle}>Rental Conditions:</h3>
                        <ul className={css.list}>
                            {Array.isArray(car.rentalConditions) &&
                                car.rentalConditions.map((condition, index) => (
                                    <li className={css.items} key={index}>{condition}</li>
                                ))}
                        </ul>
                    </section>
                    <section>
                        <h3 className={css.subtitle}>Car Specifications:</h3>
                        <ul className={css.list}>
                            <li className={css.item}>
                                <svg className={css.icons}
                                    width="16"
                                    height="16"
                                >
                                    <use href={`/icons.svg#icon-scoreboard`} />
                                </svg>
                                Year: {car.year}
                            </li>
                            <li className={css.item}>
                                <svg className={css.icons}
                                    width="16"
                                    height="16"
                                >
                                    <use href={`/icons.svg#icon-car`} />
                                </svg>
                                Type: {car.type}
                            </li>
                            <li className={css.item}>
                                <svg className={css.icons}
                                    width="16"
                                    height="16"
                                >
                                    <use href={`/icons.svg#icon-oil-station`} />
                                </svg>
                                Fuel Consumption: {car.fuelConsumption}
                            </li>
                            <li className={css.item}>
                                <svg className={css.icons}
                                    width="16"
                                    height="16"
                                >
                                    <use href={`/icons.svg#icon-spare-part`} />
                                </svg>
                                Engine Size: {car.engineSize}
                            </li>
                        </ul>
                    </section>
                    <section>
                        <h3 className={css.subtitle}>Accessories and functionalities:</h3>
                        <ul className={css.list}>
                            {car.accessories?.map((acc, index) => (
                                <li className={css.items} key={index}>{acc}</li>
                            ))}
                            {car.functionalities?.map((func, index) => (
                                <li className={css.items} key={index}>{func}</li>
                            ))}
                        </ul>
                    </section>
                </div>


            </div>

        </div>
    );
};

export default CarDetailsPage;