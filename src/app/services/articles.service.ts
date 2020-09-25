import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import * as firebase from 'firebase';
import {Article} from '../model/Article.model';

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {

  article: Article;
  articles: Article[] = [];
  articleSubject = new Subject<Article[]>();

  constructor() {
  }

  emitArticle() {
    this.articleSubject.next(this.articles);
  }

  saveArticle() {
    firebase.database().ref('/articles').set(this.articles);
  }

  getArticle() {
    firebase.database().ref('/articles').on('value', (data) => {
      this.articles = data.val() ? data.val() : [];
      this.emitArticle();
    });
    this.article = this.articles[0];
  }

  getArticleById(id: string){
    firebase.database().ref('/articles').on('value', (data) =>{
      this.articles = data.val() ? data.val() : [];
    });
    for (const index in this.articles){
      if (this.articles[index].userId === firebase.auth().currentUser.uid){
        this.removeArticle(this.articles[index]);
      }
    }
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
    this.articles.push(newArticle);
    this.saveArticle();
    this.emitArticle();
  }

  removeArticle(article: Article) {
    if (article.photo) {
      const storageRef = firebase.storage().refFromURL(article.photo);
      storageRef.delete().then(
        () => {
          console.log('Photo supprimé');
        }
      ).catch(
        (error) => {
          console.log('Fichier non trouvé : ' + error);
        }
      );
    }
    const articleIndexToRemove = this.articles.findIndex(
      (articleEL) => {
        if (articleEL === article) {
          return true;
        }
      }
    );
    this.articles.splice(articleIndexToRemove, 1);
    this.saveArticle();
    this.emitArticle();
  }

  uploadFile(file: File) {
    return new Promise
    (
      (resolve, reject) => {
        const almostUniqueFileName = Date.now().toString();
        const uplaod = firebase.storage().ref().child('/images' + almostUniqueFileName + file.name)
          .put(file);
        uplaod.on(firebase.storage.TaskEvent.STATE_CHANGED,
          () => {
            console.log('Chargement...');
          },
          (error) => {
            console.log('Erreur de charment : ' + error);
            reject();
          },
          () => {
            console.log('Chargé');
            resolve(uplaod.snapshot.ref.getDownloadURL());
          }
        );
      }
    );
  }

  updateArticle(article: Article, index: number) {
    console.log('articles ' + index);
    return firebase.database().ref('/articles/' + index).update(article);
  }

}
