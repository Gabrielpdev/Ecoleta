/* eslint-disable camelcase */

// Action type

export enum UserTypes{
  UPDATE_PROFILE_REQUEST = '@user/UPDATE_PROFILE_REQUEST',
  UPDATE_PROFILE_SUCCESS = '@user/UPDATE_PROFILE_SUCCESS',
  UPDATE_PROFILE_FAILURE = '@user/UPDATE_PROFILE_FAILURE',
}

// Data type

export interface Profile {
  id: number,
  name: string,
  email: string,
  is_admin: boolean,
}


export interface User{
  name: string,
  email: string,
  is_admin: boolean,
  oldPassword: string,
  password: string,
  confirmPassword: string,
}

// State type

export interface UserState {
  readonly profile: Profile,
}
