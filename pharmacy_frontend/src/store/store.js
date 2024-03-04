import {configureStore} from '@reduxjs/toolkit'
import drugReducer from './features/drugs/drugSlice'
import labReducer from './features/labs/labSlice'


 export const store = configureStore({
    // all reducers will be here
    reducer: {
        drugs: drugReducer,
        labs: labReducer,
    }
})