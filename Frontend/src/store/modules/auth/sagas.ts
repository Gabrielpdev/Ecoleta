/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {
  takeLatest, call, put, all,
} from 'redux-saga/effects';
import { toast } from 'react-toastify';
import { AuthTypes } from './types';

import api from '../../../services/api';
import history from '../../../services/history';

import { signInSuccess, signFailure, signInRequest } from './actions';

export function* signIn({ payload }: ReturnType<typeof signInRequest>) {
  try {
    const { email, password } = payload.data;

    const response = yield call(api.post, 'session', {
      email,
      password,
    });

    const { token } = response.data;

    api.defaults.headers.Authorization = `Bearer ${token} `;

    yield put(signInSuccess(response.data));

    history.push('/dashboard');
  } catch (err) {
    toast.error('Usuário não está cadastrado');
    yield put(signFailure());
  }
}

export function signOut() {
  history.push('/');
}

export default all([
  takeLatest(AuthTypes.SIGN_IN_REQUEST, signIn),
  takeLatest(AuthTypes.SIGN_OUT, signOut),
]);
