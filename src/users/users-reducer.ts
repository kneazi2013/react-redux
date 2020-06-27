import { createSlice } from "@reduxjs/toolkit";
import { Action } from "redux";

export type TUsersReducerState = {
  readonly id: number;
  readonly name: string;
  readonly age: number;
};

type TUpdateDataAction = Action<string> & {
  payload: TUsersReducerState | undefined;
};

export const usersArr: TUsersReducerState[] = [
  {
    id: 1,
    name: "Andrey",
    age: 18,
  },
  {
    id: 2,
    name: "Wasea",
    age: 32,
  },
  {
    id: 3,
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
