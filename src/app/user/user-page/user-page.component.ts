import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../services/user.service';
import {UserModel} from '../../model/User.model';
import * as firebase from 'firebase';
import {ArticlesService} from '../../services/articles.service';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {

  isAuth: boolean;
  userModel: UserModel;

  constructor(private route: ActivatedRoute,
              private userService: UserService,
              private articlesService: ArticlesService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.userModel = new UserModel('', '', '', '', '', 0, '', 0, '', '', 0, 0, 0);
    this.userModel = this.userService.getUser(firebase.auth().currentUser.uid);
  }

  clickDelete() {
    this.articlesService.getArticleById(firebase.auth().currentUser.uid);
    this.userService.deleteUser(this.userService.getUser(firebase.auth().currentUser.uid));
  }
}
