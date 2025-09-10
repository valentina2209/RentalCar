import CarCard from "../CarCard/CarCard";
import css from "./CarList.module.css"

export default function CarList({ cars }) {

    const uniqueCars = Array.from(new Map(cars.map(car => [car.id, car])).values());
    return (
        <div className={css.container}>
            <ul className={css.list}>
                {uniqueCars.map((car) => (
                    <li className={css.items} key={car.id}>
                        <CarCard car={car} />
                    </li>
                ))}
            </ul>
        </div>
    );
}
