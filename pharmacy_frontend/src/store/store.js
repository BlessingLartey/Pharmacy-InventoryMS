import {configureStore} from '@reduxjs/toolkit'
import drugReducer from './features/drugs/drugSlice'

 export const store = configureStore({
    // all reducers will be here
    reducer: {
        drugs: drugReducer
    }
})