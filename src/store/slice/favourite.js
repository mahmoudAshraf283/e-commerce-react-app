import { createSlice } from "@reduxjs/toolkit";
const favouriteSlice = createSlice({
    name: "favourite",
    initialState: {
        favourites: [],
    },
    reducers: {
        addToFavourite: (state, action) => {
            const itemExists = state.favourites.find(item => item.id === action.payload.id);
            if (!itemExists) {
                state.favourites.push(action.payload);
                alert(`${action.payload.title} added to Favourites`);
                
            }
        },
        removeFromFavourite: (state, action) => {
            state.favourites = state.favourites.filter(item => item.id !== action.payload.id);
            alert(`${action.payload.title} removed from Favourites`);
        },
        clearFavourites: (state) => {
            state.favourites = [];
        },
    },
});
export const { addToFavourite, removeFromFavourite, clearFavourites } = favouriteSlice.actions;
export default favouriteSlice.reducer;