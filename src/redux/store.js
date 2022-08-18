import { configureStore } from '@reduxjs/toolkit'
import journalSlice from './journalSlice'

export const store = configureStore({
  reducer: {
    journal: journalSlice
  },
})