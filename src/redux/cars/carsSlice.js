import { createSlice } from "@reduxjs/toolkit";
import { fetchCars, fetchCarById } from "./carsOperations";

const initialFavorites = JSON.parse(localStorage.getItem("favorites")) || [];

const initialState = {
    items: [],
    favorites: initialFavorites,

    isLoading: false,
    error: null,
    filters: {
        brand: "",
        price: "",
        mileageFrom: "",
        mileageTo: "",
    },
    uniqueBrands: [],
    uniquePrices: [],
    page: 1,
    hasMore: true,
};

const carsSlice = createSlice({
    name: "cars",
    initialState,
    reducers: {
        toggleFavorite: (state, action) => {
            const carId = action.payload;
            if (state.favorites.includes(carId)) {
                state.favorites = state.favorites.filter(id => id !== carId);
            } else {
                state.favorites.push(carId);
            }
            localStorage.setItem("favorites", JSON.stringify(state.favorites));
        },
        setFilters(state, action) {
            state.filters = action.payload;
            state.items = [];
            state.page = 1;
            state.hasMore = true;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCars.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchCars.fulfilled, (state, action) => {
                state.isLoading = false;
                const newCars = action.payload.cars;

                if (Array.isArray(newCars)) {
                    const uniqueNewCars = newCars.filter(
                        (newCar) =>
                            !state.items.some((existingCar) => existingCar.id === newCar.id)
                    );
                    state.items = [...state.items, ...uniqueNewCars];
                    state.hasMore = uniqueNewCars.length > 0;
                    if (state.hasMore) {
                        state.page += 1;
                    }

                    const allBrands = state.items.map((car) => car.brand);
                    state.uniqueBrands = [...new Set(allBrands)];

                    const allPrices = state.items.map((car) => parseInt(car.rentalPrice.replace("$", "")));
                    state.uniquePrices = [...new Set(allPrices)].sort((a, b) => a - b);
                } else {
                    console.error("Отримані дані не є масивом:", action.payload);
                }
            })
            .addCase(fetchCars.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(fetchCarById.fulfilled, (state, action) => {
                const car = action.payload;
                if (!state.allCars.some((item) => item.id === car.id)) {
                    state.allCars.push(car);
                    state.filteredCars.push(car);
                }
            })
    },
});

export const { setFilters, resetCars, toggleFavorite } = carsSlice.actions;
export const carsReducer = carsSlice.reducer;