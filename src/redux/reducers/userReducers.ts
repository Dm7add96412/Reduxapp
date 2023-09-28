import { PayloadAction, createSlice } from "@reduxjs/toolkit"

import User from "../../types/User"

const initialState: User[] = []

const userSlice = createSlice({
    name: 'userSlice',
    initialState,
    reducers: {
        addUser: (state, action: PayloadAction<User>) => {
            state.push(action.payload)
        },
        removeUser: (state, action: PayloadAction<number>) => {
            const foundUser = state.findIndex(u => u.id === action.payload)
            foundUser >= 0 ? state.splice(foundUser, 1) : console.log('could not remove product index:', foundUser)
        }
    }
})

const userReducer = userSlice.reducer

export const { addUser, removeUser } = userSlice.actions
export default userReducer