import React from "react";
import { render } from "@testing-library/react";
import { Users } from "./users";
import { usersArr, TUsersReducerState } from "./users-reducer";

test("renders learn react link", () => {
  const onHandleChange = (user: TUsersReducerState) => {};
  for (let user in usersArr) {
    const { name, age } = user;
    render(<Users name={name} age={age} onHandleChange={onHandleChange} />);
  }
});
