/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { action } from 'typesafe-actions';
import { AuthTypes, Auth } from './types';

export const signInRequest = (email: Auth, password: Auth) => action(
  AuthTypes.SIGN_IN_REQUEST, email, password,
);

export const signInSuccess = (token: Auth, user: Auth) => action(
  AuthTypes.SIGN_IN_SUCCESS, token, user,
);

export const signFailure = () => action(
  AuthTypes.SIGN_FAILURE,
);

export const signOut = () => action(
  AuthTypes.SIGN_OUT,
);
