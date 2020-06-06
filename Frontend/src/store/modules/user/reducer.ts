import { Reducer } from 'redux';
import { UserState, UserTypes } from './types';
import { AuthTypes } from '../auth/types';

const INITIAL_SATE: UserState = {
  profile: {
    id: 0,
    name: '',
    email: '',
    is_admin: false,
  },
};

const reducer: Reducer<UserState> = (state = INITIAL_SATE, action) => {
  switch (action.type) {
    case AuthTypes.SIGN_IN_SUCCESS: {
      return { ...state, profile: action.payload.data.user };
    }
    case UserTypes.UPDATE_PROFILE_SUCCESS: {
      return {
        ...state, profile: action.payload,
      };
    }
    case AuthTypes.SIGN_OUT: {
      return { ...state, profile: undefined };
    }
    default:
      return state;
  }
};

export default reducer;
