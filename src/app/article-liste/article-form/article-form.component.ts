import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ArticlesService} from '../../services/articles.service';
import {Router} from '@angular/router';
import {Article} from '../../model/Article.model';
import * as firebase from 'firebase';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-article-form',
  templateUrl: './article-form.component.html',
  styleUrls: ['./article-form.component.css']
})
export class ArticleFormComponent implements OnInit {

  articleForm: FormGroup;
  fileIsUploading = false;
  fileUrl: string;
  fileUploaded = false;

  constructor(private formBuilder: FormBuilder,
              private articleService: ArticlesService,
              private userService: UserService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.articleForm = this.formBuilder.group({
        title: ['', Validators.required],
        categorie: ['', Validators.required],
        description: ['', Validators.required],
        miseAPrix: ['', Validators.required],
        debutEnchere: ['', Validators.required],
        finEnchere: ['', Validators.required],
        retrait: ['', Validators.required]
      }
    );
  }

  onSaveArticle() {
    const title = this.articleForm.get('title').value;
    const description = this.articleForm.get('description').value;
    const categorie = this.articleForm.get('categorie').value;
    const miseAPrix = this.articleForm.get('miseAPrix').value;
    const debutEnchere = this.articleForm.get('debutEnchere').value;
    const finEnchere = this.articleForm.get('finEnchere').value;
    const retrait = this.articleForm.get('retrait').value;
    const userId = firebase.auth().currentUser.uid;
    const pseudoUser = this.userService.getUser(userId).pseudo;
    const newArticle = new Article(title, description, categorie, miseAPrix, debutEnchere, finEnchere, retrait, pseudoUser, userId);
    if (this.fileUrl && this.fileUrl !== '') {
      newArticle.photo = this.fileUrl;
    }
    this.articleService.createNewArticle(newArticle);
    this.router.navigate(['/articles']);
  }

  onUplaodFile(file: File) {
    this.fileIsUploading = true;
    this.articleService.uploadFile(file).then(
      (url: string) => {
        this.fileUrl = url;
        this.fileIsUploading = false;
        this.fileUploaded = true;
      }
    );
  }

  detectFiles(event) {
    this.onUplaodFile(event.target.files[0]);
  }

}
