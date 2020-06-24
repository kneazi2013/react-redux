import React, { useCallback } from "react";
import { Dispatch } from "redux";
import { useSelector, useDispatch } from "react-redux";
import users, { usersArr } from "./users-reducer";

type TStore = import("../store.d").TStore;
type TUsersReducerState = import("./users-reducer").TUsersReducerState;

type TUsers = TUsersReducerState & {
  onHandleChange: (user: TUsersReducerState) => void;
};

const onHandleChange = (dispatch: Dispatch, user: TUsersReducerState) => {
  console.log("click", user.name);
  const action = users.actions.updateData(user);
  dispatch(action);
};

export function Users({ name, age, onHandleChange }: TUsers): JSX.Element {
  return (
    <div>
      <ul>
        {usersArr.map((user: TUsersReducerState, idx: number) => {
          const { name, age } = user;
          return (
            <li key={idx}>
              <button
                onClick={(evt) => {
                  evt.preventDefault();
                  evt.stopPropagation();
                  onHandleChange(user);
                }}
              >
                {name} = {age}
              </button>
            </li>
          );
        })}
      </ul>
      <hr />
      <div>
        User: {name} - {age}
      </div>
    </div>
  );
}

function UsersContainer(): JSX.Element {
  const dispatch = useDispatch();
  const { name, age }: TUsersReducerState = useSelector(
    (store: TStore) => store.users
  );

  const onChange = useCallback(
    (user: TUsersReducerState) => {
      onHandleChange(dispatch, user);
    },
    [dispatch]
  );

  return <Users name={name} age={age} onHandleChange={onChange} />;
}

export default UsersContainer;
