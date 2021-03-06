/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { action } from 'typesafe-actions';
import { UserTypes, User, Profile } from './types';

export const updateProfileRequest = (data: User) => action(
  UserTypes.UPDATE_PROFILE_REQUEST, data,
);

export const updateProfileSuccess = (profile: Profile) => action(
  UserTypes.UPDATE_PROFILE_SUCCESS, profile,
);

export const updateProfileFailure = () => action(UserTypes.UPDATE_PROFILE_FAILURE);
