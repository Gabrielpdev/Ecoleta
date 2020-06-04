import { Reducer } from 'redux';
import { AuthState, AuthTypes } from './types';

const INITIAL_SATE: AuthState = {
  token: undefined,
  signed: false,
  loading: false,
};

const reducer: Reducer<AuthState> = (state = INITIAL_SATE, action) => {
  switch (action.type) {
    case AuthTypes.SIGN_IN_REQUEST: {
      return { ...state, loading: true };
    }
    case AuthTypes.SIGN_IN_SUCCESS: {
      return {
        ...state, loading: false, signed: true, token: action.payload.token,
      };
    }
    case AuthTypes.SIGN_FAILURE: {
      return { ...state, loading: false };
    }
    case AuthTypes.SIGN_OUT: {
      return { ...state, signed: false, token: '' };
    }
    default:
      return state;
  }
};

export default reducer;
