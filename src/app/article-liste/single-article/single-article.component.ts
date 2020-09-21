import {Component, OnInit} from '@angular/core';
import {Article} from '../../model/Article.model';
import {ActivatedRoute, Router} from '@angular/router';
import {ArticlesService} from '../../services/articles.service';
import * as firebase from 'firebase';
import {UserPageComponent} from '../../user/user-page/user-page.component';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-single-article',
  templateUrl: './single-article.component.html',
  styleUrls: ['./single-article.component.css']
})
export class SingleArticleComponent implements OnInit {

  isAuth: boolean;
  date: Date;
  article: Article;

  constructor(private route: ActivatedRoute,
              private articlesService: ArticlesService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.article = new Article('', '', '', 0, this.date, this.date, '', '', '');
    const id = this.route.snapshot.params['id'];
    this.articlesService.getSingleArticle(+id).then(
      (article: Article) => {
        this.article = article;
        if (firebase.auth().currentUser.uid === this.article.userId) {
          this.isAuth = true;
        } else {
          this.isAuth = false;
        }
      }
    );
  }

  onDeleteArticle(article: Article) {
    this.articlesService.removeArticle(article);
    this.router.navigate(['/articles']);
    console.log('Article supprimé');
  }

  onBack() {
    this.router.navigate(['/articles']);
  }

}
