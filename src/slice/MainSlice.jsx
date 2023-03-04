import { createSlice } from '@reduxjs/toolkit'

const mainSlice = createSlice({ 
    name: 'main',
    initialState: {
        bestScore: 0,
        animeData: [],
        animeLeft: [],
        animeRight: []
    },
    reducers: {
        displayBest: (state,action)=>{
            state.bestScore = action.payload
        },
        addData: (state,action)=>{
            state.animeData = action.payload.flat()
        }
    }
 })

 export const mainActions = mainSlice.actions

 export default mainSlice.reducer