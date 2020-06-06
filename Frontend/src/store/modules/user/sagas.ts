/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {
  takeLatest, call, put, all,
} from 'redux-saga/effects';
import { toast } from 'react-toastify';

import { store } from '../..';

import api from '../../../services/api';
import history from '../../../services/history';

import { updateProfileFailure, updateProfileSuccess, updateProfileRequest } from './actions';
import { UserTypes } from './types';

export function* updateProfile({ payload }: ReturnType<typeof updateProfileRequest>) {
  try {
    const { id } = store.getState().user.profile;

    const {
      name, email, is_admin, ...rest
    } = payload;

    const profile = {
      id,
      name,
      email,
      is_admin,
      ...(rest.oldPassword ? rest : {}),
    };

    const response = yield call(api.put, `users/${profile.id}`, profile);

    console.tron.log(profile);

    yield put(updateProfileSuccess(response.data));

    history.push('/dashboard');
    toast.success('Perfil atualizado com sucesso!');
  } catch (err) {
    toast.error('Erro ao atualizar perfil, confira seus dados!');
    yield put(updateProfileFailure());
  }
}

export default all([takeLatest(UserTypes.UPDATE_PROFILE_REQUEST, updateProfile)]);
