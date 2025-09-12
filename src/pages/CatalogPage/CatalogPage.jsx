import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFilters } from "../../redux/cars/carsSlice";
import { fetchCars } from "../../redux/cars/carsOperations";
import {
    selectCars,
    selectFilters,
    selectIsLoading,
    // selectPage,
    // selectTotalPages,

} from "../../redux/cars/carsSelectors";
import styles from "./CatalogPage.module.css";

import CarList from "../../components/CarList/CarList";
import Filters from "../../components/Filters/Filters";
import Pagination from "../../components/Pagination/Pagination";

export default function CatalogPage() {
    const dispatch = useDispatch();
    const cars = useSelector(selectCars);
    const filters = useSelector(selectFilters);
    // const page = useSelector(selectPage);
    // const totalPages = useSelector(selectTotalPages);
    const isLoading = useSelector(selectIsLoading);

    useEffect(() => {
        dispatch(fetchCars({ page: 1, ...filters }));
    }, [dispatch, filters]);

    const handleFiltersChange = (newFilters) => {
        dispatch(setFilters(newFilters));
        dispatch(fetchCars({ page: 1, ...newFilters }));
    };

    // const handleLoadMore = () => {
    //     if (page < totalPages) {
    //         dispatch(fetchCars({ page: page + 1, ...filters }));
    //     }
    // };

    return (
        <div className={styles.catalogWrapper}>
            <Filters
                onChange={handleFiltersChange}
            />
            <CarList cars={cars} />
            {isLoading && <p>Loading...</p>}
            <Pagination />
        </div>
    );
}

