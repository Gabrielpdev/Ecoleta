/* eslint-disable camelcase */

// Action type

export enum AuthTypes{
  SIGN_IN_REQUEST = '@auth/SIGN_IN_REQUEST',
  SIGN_IN_SUCCESS = '@auth/SIGN_IN_SUCCESS',
  SIGN_FAILURE = '@auth/SIGN_FAILURE',
  SIGN_OUT = '@auth/SIGN_OUT',
}

// Data type

export interface User {
  name: string,
  email: string,
  password: string,
  is_admin: boolean,
}

export interface Auth{
  email: string,
  password: string,
  token?: string,
  user: User
}

// State type

export interface AuthState {
  readonly token?: string,
  readonly signed: boolean,
  readonly loading: boolean,
}
