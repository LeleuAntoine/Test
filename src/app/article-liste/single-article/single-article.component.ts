import {Component, OnInit} from '@angular/core';
import {Article} from '../../model/Article.model';
import {ActivatedRoute, Router} from '@angular/router';
import {ArticlesService} from '../../services/articles.service';
import * as firebase from 'firebase';
import {UserPageComponent} from '../../user/user-page/user-page.component';
import {UserService} from '../../services/user.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserModel} from '../../model/User.model';

@Component({
  selector: 'app-single-article',
  templateUrl: './single-article.component.html',
  styleUrls: ['./single-article.component.css']
})
export class SingleArticleComponent implements OnInit {

  userModel: UserModel;
  isAuth: boolean;
  date: Date;
  article: Article;
  enchereForm: FormGroup;
  enchereReussi = false;
  enchereEchec = false;

  constructor(private articlesService: ArticlesService,
              public userService: UserService,
              private formBuilder: FormBuilder,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.initForm();
    this.article = new Article('', '', '', 0, this.date, this.date, '', '', '', 0, '');
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

  initForm() {
    this.enchereForm = this.formBuilder.group({
      maProposition: ['', Validators.required]
    });
  }

  onDeleteArticle(article: Article) {
    this.articlesService.removeArticle(article);
    this.router.navigate(['/articles']);
    console.log('Article supprimé');
  }

  onBack() {
    this.router.navigate(['/articles']);
  }

  encherir() {
    console.log('enchere');
    const credit = this.enchereForm.get('maProposition').value;
    this.userModel = this.userService.getUser(firebase.auth().currentUser.uid);
    if (this.article.prixDeDepart < credit) {
      if (this.article.meilleurOffre < credit && this.userModel.credit >= credit) {
        // mise à jour infos utilisateurs
        this.userModel.credit = this.userModel.credit - this.enchereForm.get('maProposition').value;
        this.userModel.creditEnchere = credit;
        this.userService.updateUser(this.userModel);
        // mise a jour infos article
        this.article.meilleurOffre = credit;
        this.article.acheteur = firebase.auth().currentUser.uid;
        this.articlesService.updateArticle(this.article, this.route.snapshot.params['id']);
        this.enchereReussi = true;
      } else {
        this.enchereEchec = true;
      }
    } else {
      if (this.article.prixDeDepart <= credit && this.userModel.credit >= credit && !this.article.acheteur) {
        // mise à jour infos utilisateurs
        this.userModel.credit = this.userModel.credit - this.enchereForm.get('maProposition').value;
        this.userModel.creditEnchere = credit;
        this.userService.updateUser(this.userModel);
        // mise a jour infos article
        this.article.meilleurOffre = credit;
        this.article.acheteur = firebase.auth().currentUser.uid;
        this.articlesService.updateArticle(this.article, this.route.snapshot.params['id']);
        this.enchereReussi = true;
      } else {
        this.enchereEchec = true;
      }
    }
  }
}
