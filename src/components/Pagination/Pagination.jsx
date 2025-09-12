import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectHasMore, selectIsLoading, selectPage } from "../../redux/cars/carsSelectors";
import { loadMore } from "../../redux/cars/carsSlice";
import { fetchCars } from "../../redux/cars/carsOperations";
import css from "./Pagination.module.css"

export default function Pagination() {
    const dispatch = useDispatch();
    const currentPage = useSelector(selectPage);
    const isLoading = useSelector(selectIsLoading)

    const hasMore = useSelector(selectHasMore);

    const handleLoadMore = () => {

        if (isLoading || !hasMore) {
            return;
        }
        dispatch(loadMore());
        dispatch(fetchCars({ page: currentPage + 1 }));
    };

    return (
        <div className={css.paginationWrapper}>
            {hasMore && (
                <button
                    onClick={handleLoadMore}
                    className={css.loadMoreBtn}
                    disabled={isLoading}
                >
                    {isLoading ? "Loading..." : "Load more"}

                </button>
            )}
            {!hasMore && !isLoading}
        </div>
    )
}

