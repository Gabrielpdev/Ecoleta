import { Reducer } from 'redux';
import { UserState, UserTypes } from './types';
import { AuthTypes } from '../auth/types';

const INITIAL_SATE: UserState = {
  profile: {
    name: '',
    email: '',
    password: '',
    is_admin: false,
    oldPassword: '',
  },
};

const reducer: Reducer<UserState> = (state = INITIAL_SATE, action) => {
  switch (action.type) {
    case AuthTypes.SIGN_IN_SUCCESS: {
      return { ...state, profile: action.payload.data.user };
    }
    case UserTypes.UPDATE_PROFILE_SUCCESS: {
      return {
        ...state, profile: action.payload.profile,
      };
    }
    case AuthTypes.SIGN_OUT: {
      return { ...state, profile: {} };
    }
    default:
      return state;
  }
};

export default reducer;
