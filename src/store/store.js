import { configureStore } from '@reduxjs/toolkit'
import itemsSlice from '../reducer/itemsSlice'
export default configureStore({
  reducer: {
    abc:itemsSlice
  }
})