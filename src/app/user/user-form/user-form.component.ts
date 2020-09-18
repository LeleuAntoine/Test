import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../services/user.service';
import * as firebase from 'firebase';
import {UserModel} from '../../model/User.model';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

  userUpdate: UserModel;
  updateForm: FormGroup;
  errorMessage: string;
  userId = firebase.auth().currentUser.uid;

  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
  ) {
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.userUpdate = this.userService.getUser(firebase.auth().currentUser.uid);
    this.updateForm = this.formBuilder.group({
      pseudo: ['', Validators.required],
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telephone: ['', Validators.required],
      rue: ['', Validators.required],
      codePostal: ['', Validators.required],
      ville: ['', Validators.required],
      password: ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]],
    });
  }

  updateUser() {
    const email = this.updateForm.get('email').value;
    const password = this.updateForm.get('password').value;
    const pseudo = this.updateForm.get('pseudo').value;
    const nom = this.updateForm.get('nom').value;
    const prenom = this.updateForm.get('prenom').value;
    const telephone = this.updateForm.get('telephone').value;
    const rue = this.updateForm.get('rue').value;
    const codePostal = this.updateForm.get('codePostal').value;
    const ville = this.updateForm.get('ville').value;
  }
}
