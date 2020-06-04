/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {
  takeLatest, call, put, all,
} from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '../../../services/api';

import { updateProfileFailure, updateProfileSuccess, updateProfileRequest } from './actions';
import { UserTypes } from './types';

export function* updateProfile({ payload }: ReturnType<typeof updateProfileRequest>) {
  try {
    const { name, email, ...rest } = payload.data;

    const profile = {
      name,
      email,
      ...(rest.oldPassword ? rest : {}),
    };

    const response = yield call(api.put, 'users', profile);

    yield put(updateProfileSuccess(response.data));

    toast.success('Perfil atualizado com sucesso!');
  } catch (err) {
    toast.error('Erro ao atualizar perfil, confira seus dados!');
    yield put(updateProfileFailure());
  }
}

export default all([takeLatest(UserTypes.UPDATE_PROFILE_REQUEST, updateProfile)]);
