import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFilters } from "../../redux/cars/carsSlice";
import { fetchCars } from "../../redux/cars/carsOperations";
import {
    selectCars,
    selectFilters,
    selectIsLoading,
} from "../../redux/cars/carsSelectors";
import Loader from "../../components/Loader/Loader";

import CarList from "../../components/CarList/CarList";
import Filters from "../../components/Filters/Filters";
import Pagination from "../../components/Pagination/Pagination";

export default function CatalogPage() {
    const dispatch = useDispatch();
    const cars = useSelector(selectCars);
    const filters = useSelector(selectFilters);
    const isLoading = useSelector(selectIsLoading);

    useEffect(() => {
        dispatch(fetchCars({ page: 1, ...filters }));
    }, [dispatch, filters]);

    const handleFiltersChange = (newFilters) => {
        dispatch(setFilters(newFilters));
        dispatch(fetchCars({ page: 1, ...newFilters }));
    };

    return (
        <div>
            <Filters
                onChange={handleFiltersChange}
            />
            <CarList cars={cars} />
            {isLoading && <Loader />}
            <Pagination />
        </div>
    );
}

