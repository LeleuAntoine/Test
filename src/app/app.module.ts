import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {HttpClientModule} from '@angular/common/http';
import {SignupComponent} from './auth/signup/signup.component';
import {SigninComponent} from './auth/signin/signin.component';
import {ArticleListeComponent} from './article-liste/article-liste.component';
import {SingleArticleComponent} from './article-liste/single-article/single-article.component';
import {ArticleFormComponent} from './article-liste/article-form/article-form.component';
import {AuthService} from './services/auth.service';
import {ArticlesService} from './services/articles.service';
import {AuthGuardService} from './services/auth-guard.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import { UserFormComponent } from './user/user-form/user-form.component';
import { UserPageComponent } from './user/user-page/user-page.component';
import {UserService} from './services/user.service';
import { CategorieComponent } from './categorie/categorie.component';

const appRoutes: Routes = [
  {path: 'auth/signup', component: SignupComponent},
  {path: 'auth/signin', component: SigninComponent},
  {path: 'user/view', canActivate: [AuthGuardService], component: UserPageComponent},
  {path: 'user/update', canActivate: [AuthGuardService], component: UserFormComponent},
  {path: 'articles', component: ArticleListeComponent},
  {path: 'articles/new', canActivate: [AuthGuardService], component: ArticleFormComponent},
  {path: 'articles/view/:id', canActivate: [AuthGuardService], component: SingleArticleComponent},
  {path: 'categories', canActivate: [AuthGuardService], component: CategorieComponent},
  {path: '', redirectTo: 'articles', pathMatch: 'full'},
  {path: '**', redirectTo: 'articles'}

];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SignupComponent,
    SigninComponent,
    ArticleListeComponent,
    SingleArticleComponent,
    ArticleFormComponent,
    UserFormComponent,
    UserPageComponent,
    CategorieComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    AuthService,
    ArticlesService,
    AuthGuardService,
    UserService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
