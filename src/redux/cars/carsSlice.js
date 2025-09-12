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
    totalPages: 1,
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
            state.totalPages = 1;
        },
        resetCars(state) {
            state.items = [];
            state.page = 1;
            state.totalPages = 1;
        },
        loadMore(state) {
            if (state.hasMore) {
                state.page += 1;
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCars.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            // .addCase(fetchCars.fulfilled, (state, action) => {
            //     state.isLoading = false;
            //     const newCars = action.payload.cars || [];

            //     if (Array.isArray(newCars)) {

            //         state.items = [...state.items, ...newCars]

            //         const limit = 12;
            //         state.hasMore = newCars.length === limit;
            //     }
            // })
            .addCase(fetchCars.fulfilled, (state, action) => {
                state.isLoading = false;
                const newCars = action.payload.cars || [];



                // ✅ Додайте логіку для отримання унікальних брендів
                if (state.uniqueBrands.length === 0) {
                    const allBrands = state.items.map(car => car.brand);
                    const uniqueBrandsSet = new Set(allBrands);
                    state.uniqueBrands = [...uniqueBrandsSet];

                    const allPrices = state.items.map(car => car.rentalPrice);
                    const uniquePricesSet = new Set(allPrices);
                    state.uniquePrices = [...uniquePricesSet].sort((a, b) => a - b);


                }

                state.items = [...state.items, ...newCars];
                state.hasMore = newCars.length === 12;



            })
            .addCase(fetchCars.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(fetchCarById.fulfilled, (state, action) => {
                const car = action.payload;
                if (!state.items.some((item) => item.id === car.id)) {
                    state.items.push(car);
                }
            })
    },
});

export const { setFilters, resetCars, toggleFavorite, loadMore } = carsSlice.actions;
export const carsReducer = carsSlice.reducer;