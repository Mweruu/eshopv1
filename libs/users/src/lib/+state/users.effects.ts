import { Injectable, inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { switchMap, catchError, of, concatMap, map } from 'rxjs';
import * as UsersActions from './users.actions';
import * as UsersFeature from './users.reducer';
import { LocalstorageService } from '../services/localstorage.service';
import { UsersService } from '../services/users.service';

@Injectable()
export class UsersEffects {
  buildUserSession$ = createEffect(()=>
  this.actions$.pipe(
    ofType(UsersActions.buildUserSession),
    concatMap(() => {
      if(this.localStorage.isValidToken()){
        const userId = this.localStorage.getUserIdFromToken()
        if(userId){
          return this.usersService.getUser(userId).pipe(
            map((user)=>{
              return UsersActions.BuildUsersSessionSuccess({user:user})
            }),
            catchError(()=> of(UsersActions.buildUsersSessionFailed()))
          );
        }else{
          return of(UsersActions.buildUsersSessionFailed())
        }

      }else{
        return of(UsersActions.buildUsersSessionFailed())
      }
    })
  ))

  constructor(private actions$: Actions,
              private localStorage:LocalstorageService,
              private usersService:UsersService,
    ){}
}
