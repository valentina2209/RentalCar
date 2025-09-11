import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCars } from "../../redux/cars/carsOperations";
import {
    selectCars,
    selectFilters,

} from "../../redux/cars/carsSelectors";
import styles from "./CatalogPage.module.css";

import CarList from "../../components/CarList/CarList";
import Filters from "../../components/Filters/Filters";
import Pagination from "../../components/Pagination/Pagination";

export default function CatalogPage() {
    const dispatch = useDispatch();
    const cars = useSelector(selectCars);
    const filters = useSelector(selectFilters);

    useEffect(() => {
        dispatch(fetchCars({ page: 1, ...filters }));
    }, [dispatch, filters]);

    return (
        <div className={styles.catalogWrapper}>
            <Filters />
            <CarList cars={cars} />
            <Pagination />
        </div>
    );
}

