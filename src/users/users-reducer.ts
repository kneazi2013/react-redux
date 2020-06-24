import { createSlice } from "@reduxjs/toolkit";
import { Action } from "redux";

export type TUsersReducerState = {
  readonly name: string;
  readonly age: number;
};

type TUpdateDataAction = Action<string> & {
  payload: TUsersReducerState;
};

export const usersArr: TUsersReducerState[] = [
  {
    name: "Andrey",
    age: 18,
  },
  {
    name: "Wasea",
    age: 32,
  },
  {
    name: "Slava",
    age: 47,
  },
];

const initialState: TUsersReducerState = Object.freeze({ ...usersArr[0] });

const updateData = (state: TUsersReducerState, action: TUpdateDataAction) => ({
  ...state,
  ...action.payload,
});

const users = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateData,
  },
});

export default users;
