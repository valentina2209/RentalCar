import CarCard from "../CarCard/CarCard";


export default function CarList({ cars }) {

    const uniqueCars = Array.from(new Map(cars.map(car => [car.id, car])).values());
    return (
        <ul>
            {uniqueCars.map((car) => (
                <li key={car.id}>
                    <CarCard car={car} />
                </li>
            ))}
        </ul>
    );
}
