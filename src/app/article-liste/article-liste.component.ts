import {Component, OnDestroy, OnInit} from '@angular/core';
import {Article} from '../model/Article.model';
import {Subscription} from 'rxjs';
import {ArticlesService} from '../services/articles.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-article-liste',
  templateUrl: './article-liste.component.html',
  styleUrls: ['./article-liste.component.css']
})
export class ArticleListeComponent implements OnInit , OnDestroy{

  articles: Article[];
  articleSubscription: Subscription;

  constructor(private articlesService: ArticlesService, private router: Router) {
  }

  ngOnInit(): void {
    this.articleSubscription = this.articlesService.articleSubject.subscribe(
      (articles: Article[]) => {
        this.articles = articles;
      }
    );
    this.articlesService.emitArticle();
  }

  onNewArticle(){
    this.router.navigate(['/articles', 'new']);
  }

  onDeleteArticle(article: Article){
    this.articlesService.removeArticle(article);
  }

  onViewArticle(id: number){
    this.router.navigate(['/articles', 'view', id]);
  }

  ngOnDestroy(){
    this.articleSubscription.unsubscribe();
  }
}
