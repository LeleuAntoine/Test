import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';
import * as firebase from 'firebase';
import {CategorieService} from '../services/categorie.service';
import {UserService} from '../services/user.service';
import {Categorie} from '../model/Categorie.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';


@Component({
  selector: 'app-categorie',
  templateUrl: './categorie.component.html',
  styleUrls: ['./categorie.component.css']
})
export class CategorieComponent implements OnInit, OnDestroy {

  isAuth = false;
  categories: Categorie[];
  categorie: Categorie;
  categorieSubscription: Subscription;
  categorieForm: FormGroup;

  constructor(private categorieService: CategorieService,
              private router: Router,
              private userService: UserService,
              private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.initForm();
    this.categorieSubscription = this.categorieService.categorieSubject.subscribe(
      (categorie: Categorie[]) => {
        this.categories = categorie;
      }
    );
    this.categorieService.getCategorie();
    this.categorieService.emitCategorie();
    if (this.userService.getUser(firebase.auth().currentUser.uid).role === 1) {
      this.isAuth = true;
    }
  }

  initForm() {
    this.categorieForm = this.formBuilder.group({
        libele: ['', Validators.required],
      }
    );
  }

  saveCategorie() {
    const libele = this.categorieForm.get('libele').value;
    const newCategorie = new Categorie(libele);
    this.categorieService.createNewCategorie(newCategorie);
  }

  deleteCategorie(index: number) {
    this.categorieService.deleteCategorie(index);
  }

  ngOnDestroy() {
    this.categorieSubscription.unsubscribe();
  }
}
