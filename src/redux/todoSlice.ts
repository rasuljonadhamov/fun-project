import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { todos, todo } from "/src/types/type";

const todoSlice = createSlice({
  name: "todoSlice",
  initialState: [] as todos,
  reducers: {
    addTodo: (state, { payload }: PayloadAction<todo>) => {
      state.push(payload);
    },
    deleteTodo: (state, { payload }: PayloadAction<number>) => {
      return state.filter((todo) => todo.id !== payload);
    },
    reverseCompleted: (state, { payload }: PayloadAction<number>) => {
      const todoToUpdate = state.find((todo) => todo.id === payload);
      if (todoToUpdate) {
        todoToUpdate.completed = !todoToUpdate.completed;
      }
    },
  },
});

export const { addTodo, deleteTodo, reverseCompleted } = todoSlice.actions;

export default todoSlice.reducer;
