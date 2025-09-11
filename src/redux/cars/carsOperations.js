import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "https://car-rental-api.goit.global";

export const fetchCars = createAsyncThunk(
    "cars/fetchCars",
    async ({ page, brand, price, mileageFrom, mileageTo }, thunkAPI) => {
        try {
            const response = await axios.get("/cars", {
                params: {
                    page,
                    limit: 12,
                    brand,
                    price,
                    mileageFrom,
                    mileageTo,
                },
            });
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);
export const fetchCarById = createAsyncThunk(
    "cars/fetchById",
    async (id, thunkAPI) => {
        try {
            const response = await axios.get(`/cars/${id}`);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message)
        }
    }
);