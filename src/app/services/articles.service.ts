import {Injectable} from '@angular/core';
import {Article} from '../model/Article.model';
import {Subject} from 'rxjs';
import * as firebase from 'firebase';
import {rejects} from 'assert';

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {

  article: Article[] = [];
  articleSubject = new Subject<Article[]>();

  constructor() {
  }

  emitArticle() {
    this.articleSubject.next(this.article);
  }

  saveArticle() {
    firebase.database().ref('/articles').set(this.article);
  }

  getArticle() {
    firebase.database().ref('/articles').on('value', (data) => {
      this.article = data.val() ? data.val() : [];
      this.emitArticle();
    });
  }

  getSingleArticle(id: number) {
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('/articles/' + id).once('value').then(
          (data) => {
            resolve(data.val());
          }, (error) => {
            reject(error);
          }
        );
      }
    );
  }

  createNewArticle(newArticle: Article) {
    this.article.push(newArticle);
    this.saveArticle();
    this.emitArticle();
  }

  removeArticle(article: Article) {
    const articleIndexToRemove = this.article.findIndex(
      (articleEL) => {
        if (articleEL === article) {
          return true;
        }
      }
    );
    this.article.splice(articleIndexToRemove, 1);
    this.saveArticle();
    this.emitArticle();
  }

}
