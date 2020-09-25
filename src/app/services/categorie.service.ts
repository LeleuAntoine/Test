import {Injectable} from '@angular/core';
import * as firebase from 'firebase';
import {Categorie} from '../model/Categorie.model';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategorieService {

  categorie: Categorie;
  categories: Categorie[] = [];
  categorieSubject = new Subject<Categorie[]>();

  constructor() {
  }

  getCategorie() {
    firebase.database().ref('/categories').on('value', (data) => {
      this.categories = data.val() ? data.val() : [];
      this.emitCategorie();
    });
    this.categorie = this.categories[0];
  }

  emitCategorie() {
    this.categorieSubject.next(this.categories);
  }

  saveCategorie() {
    firebase.database().ref('/categories').set(this.categories);
    this.saveCategorie();
    this.emitCategorie();
  }

  createNewCategorie(newCategorie: Categorie) {
    this.categories.push(newCategorie);
    this.saveCategorie();
    this.emitCategorie();
  }

  deleteCategorie(index: number){
    this.categories.splice(index, 1);
    this.saveCategorie();
    this.emitCategorie();
  }
}
