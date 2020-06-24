type TUsersReducerState = import("./users/users-reducer").TUsersReducerState;

export type TStore = {
    users: TUsersReducerState
};