/* eslint-disable camelcase */

// Action type

export enum UserTypes{
  UPDATE_PROFILE_REQUEST = '@user/UPDATE_PROFILE_REQUEST',
  UPDATE_PROFILE_SUCCESS = '@user/UPDATE_PROFILE_SUCCESS',
  UPDATE_PROFILE_FAILURE = '@user/UPDATE_PROFILE_FAILURE',
}

// Data type

export interface Profile {
  name: string,
  email: string,
  password: string,
  is_admin: boolean,
  oldPassword: string,
}


export interface User{
  data: {
    name: string,
    email: string,
    password: string,
    oldPassword: string,
  },
  profile: Profile,
}

// State type

export interface UserState {
  readonly profile: Profile,
}
