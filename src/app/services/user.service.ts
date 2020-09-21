import {Injectable} from '@angular/core';
import * as firebase from 'firebase';
import {UserModel} from '../model/User.model';
import {Subject} from 'rxjs';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userModels: UserModel[] = [];
  userSubject = new Subject<UserModel[]>();
  userUpdate: UserModel;
  userId: string;

  constructor(private router: Router) {
  }

  createNewUser(newUser: UserModel) {
    this.userModels.push(newUser);
    this.saveUser();
    this.emitUser();
  }

  emitUser() {
    console.log('emit user');
    this.userSubject.next(this.userModels);
  }

  saveUser() {
    console.log('save user');
    firebase.database().ref('/users').set(this.userModels);
  }

  getUser(userId: string) {
    firebase.database().ref('/users').on('value', (data) => {
      this.userModels = data.val() ? data.val() : [];
    });
    for (const index in this.userModels) {
      if (this.userModels[index].userId === userId) {
        this.userUpdate = this.userModels[index];
        return this.userUpdate;
      }
    }
  }

  deleteUser(user: UserModel) {
    const userIndexToRemove = this.userModels.findIndex(
      (userEL) => {
        if (userEL === user) {
          return true;
        }
      }
    );
    this.userModels.splice(userIndexToRemove, 1);
    firebase.auth().currentUser.delete();
    this.saveUser();
    this.emitUser();
    this.router.navigate(['/articles']);
    console.log('Compte supprimé');
  }

  updateUser(userModel: UserModel) {
    for (const index in this.userModels) {
      if (this.userModels[index].userId === firebase.auth().currentUser.uid) {
        console.log('user index ' + index);
        return firebase.database().ref('/users/' + index).update(userModel);
      }
    }
  }
}

