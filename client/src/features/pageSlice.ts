import { createSlice, PayloadAction, Slice } from '@reduxjs/toolkit';

interface PageState {
    value: number;
}

const initialState: PageState = {
    value: 1,
};

const pageSlice:Slice = createSlice({
    name: 'page',
    initialState,
    reducers: {
        increment: (state) => {
            state.value += 1;
        },
        decrement: (state) => {
            if (state.value > 1) {
                state.value -= 1;
            }
        },
        setPage: (state, action: PayloadAction<number>) => {
            state.value = action.payload > 0 ? action.payload : 1;
        },
    },
});

export const pageNumberActions = pageSlice.actions;
export const pageNumberReducers =  pageSlice.reducer;