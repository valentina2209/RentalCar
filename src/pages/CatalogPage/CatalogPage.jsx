import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCars } from "../../redux/cars/carsOperations";
import {
    selectCars,
    selectFilters,
    selectIsLoading,
    selectHasMore,
} from "../../redux/cars/carsSelectors";
import styles from "./CatalogPage.module.css";

import CarList from "../../components/CarList/CarList";
import Filters from "../../components/Filters/Filters";

export default function CatalogPage() {
    const dispatch = useDispatch();
    const cars = useSelector(selectCars);
    const filters = useSelector(selectFilters);
    const isLoading = useSelector(selectIsLoading);
    const hasMore = useSelector(selectHasMore);

    useEffect(() => {
        dispatch(fetchCars({ page: 1, ...filters }));
    }, [dispatch, filters]);

    const handleLoadMore = () => {
        dispatch(fetchCars({ page: Math.ceil(cars.length / 12) + 1, ...filters }));
    };

    return (
        <div className={styles.catalogWrapper}>
            <Filters />

            <CarList cars={cars} />

            {isLoading && <p>Loading...</p>}

            {hasMore && !isLoading && (
                <button
                    className={styles.loadMoreBtn}
                    onClick={handleLoadMore}
                >
                    Load more
                </button>
            )}
        </div>
    );
}
