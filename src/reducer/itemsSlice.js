import { createSlice } from '@reduxjs/toolkit'

export const itemsSlice = createSlice({
  name: 'items',
  initialState: {
    editItems: {},
    isEdit: false,
    todoList:{},
    isLoading: true,
    isValid: false
  },
  reducers: {

    setEditItems: (state, action) => {
      console.log(action);
      state.editItems = action.payload;
      state.isEdit = true;
    },

    setIsEdit: (state, action) => {
      state.isEdit = action.payload
    },
    setTodoList: (state, action) => {

      state.todoList = action.payload
    },
    setFormReset:(state , action) => {
      state.isEdit = false;
      state.editItems = {};
    },
    setIsLoading:(state , action) => {
      console.log(action.payload)
      state.isLoading = action.payload;
    },
    setIsValid:(state , action) => {
      console.log(action.payload)
      state.isValid = action.payload;
    },

 
  }
})

// Action creators are generated for each case reducer function
export const { setEditItems , setIsEdit , setTodoList , setFormReset, setIsLoading,setIsValid} = itemsSlice.actions

export default itemsSlice.reducer