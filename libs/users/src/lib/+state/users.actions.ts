import { createAction, props } from '@ngrx/store';
import { UsersEntity } from './users.models';
import { User } from '../models/users';

export const buildUserSession = createAction('[Users] Build User Session')

export const BuildUsersSessionSuccess = createAction(
  '[Users] Build User Session Success',
  props<{ user:User }>()
);

export const buildUsersSessionFailed = createAction(
  '[Users] Build User Session failed',
);
