import {Component, OnInit} from '@angular/core';
import {Article} from '../../model/Article.model';
import {ActivatedRoute, Router} from '@angular/router';
import {ArticlesService} from '../../services/articles.service';

@Component({
  selector: 'app-single-article',
  templateUrl: './single-article.component.html',
  styleUrls: ['./single-article.component.css']
})
export class SingleArticleComponent implements OnInit {

  article: Article;

  constructor(private route: ActivatedRoute,
              private articleService: ArticlesService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.article = new Article('', '', '', '', '', '', '');
    const id = this.route.snapshot.params['id'];
    this.articleService.getSingleArticle(+id).then(
      (article: Article) => {
        this.article = article;
      }
    );
  }

  onBack(){
    this.router.navigate(['/articles']);
  }

}
