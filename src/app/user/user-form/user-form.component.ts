import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../services/user.service';
import * as firebase from 'firebase';
import {UserModel} from '../../model/User.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

  userUpdate: UserModel;
  updateForm: FormGroup;
  errorMessage: string;

  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private router: Router
  ) {
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.userUpdate = new UserModel('', '', '', '', '', 0, '', 0, '', '', 0, 0, 0);
    this.userUpdate = this.userService.getUser(firebase.auth().currentUser.uid);
    this.updateForm = this.formBuilder.group({
      pseudo: ['', Validators.required],
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      telephone: ['', Validators.required],
      rue: ['', Validators.required],
      codePostal: ['', Validators.required],
      ville: ['', Validators.required],
    });
  }

  updateUserForm() {
    const email = this.userUpdate.email;
    const password = this.userUpdate.password;
    const pseudo = this.updateForm.get('pseudo').value;
    const nom = this.updateForm.get('nom').value;
    const prenom = this.updateForm.get('prenom').value;
    const telephone = this.updateForm.get('telephone').value;
    const rue = this.updateForm.get('rue').value;
    const codePostal = this.updateForm.get('codePostal').value;
    const ville = this.updateForm.get('ville').value;
    const userId = this.userUpdate.userId;
    const credit = this.userUpdate.credit;
    const creditEnchere = this.userUpdate.creditEnchere;
    const role = this.userUpdate.role;
    this.userUpdate = new UserModel
    (userId, pseudo, nom, prenom, email, telephone, rue, codePostal, ville, password, credit, creditEnchere, role);
    this.userService.updateUser(this.userUpdate);
    this.router.navigate(['/user/view']);
  }
}
