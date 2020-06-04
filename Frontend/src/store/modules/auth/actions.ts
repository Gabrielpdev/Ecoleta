/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { action } from 'typesafe-actions';
import { AuthTypes, Auth, Authorization } from './types';

export const signInRequest = (data: Auth) => action(
  AuthTypes.SIGN_IN_REQUEST, { data },
);

export const signInSuccess = (data: Authorization) => action(
  AuthTypes.SIGN_IN_SUCCESS, { data },
);

export const signFailure = () => action(
  AuthTypes.SIGN_FAILURE,
);

export const signOut = () => action(
  AuthTypes.SIGN_OUT,
);
