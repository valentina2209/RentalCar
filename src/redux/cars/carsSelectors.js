export const selectCars = (state) => state.cars.items;
export const selectFilters = (state) => state.cars.filters;
export const selectIsLoading = (state) => state.cars.isLoading;
export const selectError = (state) => state.cars.error;
export const selectPage = (state) => state.cars.page;
export const selectHasMore = (state) => state.cars.hasMore;
export const selectFavorites = (state) => state.cars.favorites;
export const selectTotalPages = (state) => state.cars.totalPages;