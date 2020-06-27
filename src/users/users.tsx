import React, { useCallback } from "react";
import { Dispatch } from "redux";
import { useSelector, useDispatch } from "react-redux";
import users, { usersArr } from "./users-reducer";

type TStore = import("../store.d").TStore;
type TUsersReducerState = import("./users-reducer").TUsersReducerState;

type TUsers = TUsersReducerState & {
  onHandleChange: (
    evt: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => (id: number) => void;
};

// ---------------------------------
// Имплементация композиций

const getUserById = (id: number): TUsersReducerState | undefined =>
  usersArr.find((el) => el.id === id);

const applyDispatch = (dispatch: Dispatch<any>) => (
  user: TUsersReducerState | undefined
) => {
  const action = users.actions.updateData(user);
  dispatch(action);
};

const compose = (...arg: Array<Function>) => {
  return (id: number) => {
    arg.reduce((value, fn) => {
      return fn(value);
    }, id);
  };
};

// ---------------------------------
// Имплементация карирования

const onClick = (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
  evt.preventDefault();
  evt.stopPropagation();
};

const onHandleCurry = (dispatch: Dispatch<any>) => (
  evt: React.MouseEvent<HTMLButtonElement, MouseEvent>
) => {
  onClick(evt);
  return compose(getUserById, applyDispatch(dispatch));
};

// ---------------------------------

function ListUsers({
  id,
  name,
  age,
  onHandleChange,
}: TUsersReducerState & Pick<TUsers, "onHandleChange">) {
  return (
    <li>
      <button onClick={(evt) => onHandleChange(evt)(id)}>
        {id} - {name} = {age}
      </button>
    </li>
  );
}

export function Users({ id, name, age, onHandleChange }: TUsers): JSX.Element {
  return (
    <div>
      <ul>
        {usersArr.map((user: TUsersReducerState, idx: number) => {
          return (
            <ListUsers
              key={idx}
              id={user.id}
              name={user.name}
              age={user.age}
              onHandleChange={onHandleChange}
            />
          );
        })}
      </ul>
      <hr />
      <div>
        User: {id} - {name} - {age}
      </div>
    </div>
  );
}

// ---------------------------------

function UsersContainer(): JSX.Element {
  const dispatch = useDispatch();
  const onHandleChange = useCallback(onHandleCurry(dispatch), [dispatch]);
  const { id, name, age }: TUsersReducerState = useSelector(
    (store: TStore) => store.users
  );

  return (
    <Users id={id} name={name} age={age} onHandleChange={onHandleChange} />
  );
}

// ---------------------------------

export default UsersContainer;
