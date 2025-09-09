import { createSlice } from "@reduxjs/toolkit";
import { fetchCars } from "./carsOperations";

const initialState = {
    items: [],
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

                // Виправляємо помилку: отримуємо масив з action.payload
                // Згідно з вашими логами, масив знаходиться в action.payload.cars або action.payload.adverts
                // Спробуємо обидва варіанти, але, швидше за все, це cars.
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
            });
    },
});

export const { setFilters, resetCars } = carsSlice.actions;
export const carsReducer = carsSlice.reducer;