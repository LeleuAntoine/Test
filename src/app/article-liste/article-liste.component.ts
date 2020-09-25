import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {ArticlesService} from '../services/articles.service';
import {Router} from '@angular/router';
import * as firebase from 'firebase';
import {Article} from '../model/Article.model';
import {UserService} from '../services/user.service';

@Component({
  selector: 'app-article-liste',
  templateUrl: './article-liste.component.html',
  styleUrls: ['./article-liste.component.css']
})
export class ArticleListeComponent implements OnInit, OnDestroy {

  isAdmin = false;
  isAuth: boolean;
  articles: Article[];
  articleSubscription: Subscription;

  constructor(private articlesService: ArticlesService,
              private userService: UserService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.articleSubscription = this.articlesService.articleSubject.subscribe(
      (articles: Article[]) => {
        this.articles = articles;
      }
    );
    this.articlesService.getArticle();
    this.articlesService.emitArticle();
    firebase.auth().onAuthStateChanged(
      (user) => {
        if (user) {
          this.isAuth = true;
          if (this.userService.getUser(firebase.auth().currentUser.uid).role === 1) {
            this.isAdmin = true;
          }
        } else {
          this.isAuth = false;
        }
      }
    );
  }

  onNewArticle() {
    this.router.navigate(['/articles', 'new']);
  }

  onCategorie() {
    this.router.navigate(['categories']);
  }

  onViewArticle(id: number) {
    this.router.navigate(['/articles', 'view', id]);
  }

  ngOnDestroy() {
    this.articleSubscription.unsubscribe();
  }
}
