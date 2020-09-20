import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {UserService} from '../../services/user.service';
import {UserModel} from '../../model/User.model';
import * as firebase from 'firebase';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signUpForm: FormGroup;
  errorMessage: string;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private userService: UserService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.signUpForm = this.formBuilder.group({
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

  onSubmit() {
    const email = this.signUpForm.get('email').value;
    const password = this.signUpForm.get('password').value;
    const pseudo = this.signUpForm.get('pseudo').value;
    const nom = this.signUpForm.get('nom').value;
    const prenom = this.signUpForm.get('prenom').value;
    const telephone = this.signUpForm.get('telephone').value;
    const rue = this.signUpForm.get('rue').value;
    const codePostal = this.signUpForm.get('codePostal').value;
    const ville = this.signUpForm.get('ville').value;
    const credit = 0;
    const creditEnchere = 0;
    this.authService.createNewUser(email, password).then(
      () => {
        const userId = firebase.auth().currentUser.uid;
        const newUser = new UserModel(userId, pseudo, nom, prenom, email, telephone, rue, codePostal, ville, password, credit, creditEnchere);
        this.userService.createNewUser(newUser);
        console.log('Connecté');
        this.router.navigate(['/articles']);
      },
      (error) => {
        this.errorMessage = error;
      }
    );
  }
}
