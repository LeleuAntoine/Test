import {Injectable} from '@angular/core';
import * as firebase from 'firebase';
import {UserModel} from '../model/User.model';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userModels: UserModel[] = [];
  userSubject = new Subject<UserModel[]>();

  users: UserModel[] = [];
  userUpdate: UserModel;

  constructor() {
  }

  updateUser(pseudo: string, nom: string, prenom: string, telephone: string, rue: string, codePostal: string, ville: string) {
    return new Promise(
      (resolve, reject) => {
      }
    );
  }

  createNewUser(newUser: UserModel) {
    this.userModels.push(newUser);
    this.saveUser();
    this.emitUser();
  }

  emitUser() {
    this.userSubject.next(this.userModels);
  }

  saveUser() {
    firebase.database().ref('/users').set(this.userModels);
  }

  getUser(userId: string) {
    firebase.database().ref('/users').on('value', (data) => {
      this.users = data.val() ? data.val() : [];
    });
    for (const index in this.users) {
      if (this.users[index].userId === userId) {
        this.userUpdate = this.users[index];
        return this.userUpdate;
      }
    }
  }
}
