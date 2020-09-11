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

const appRoutes: Routes = [
  {path: 'auth/signup', component: SignupComponent},
  {path: 'auth/signin', component: SigninComponent},
  {path: 'articles', canActivate: [AuthGuardService], component: ArticleListeComponent},
  {path: 'articles/new', canActivate: [AuthGuardService], component: ArticleFormComponent},
  {path: 'articles/view/:id', canActivate: [AuthGuardService], component: SingleArticleComponent},
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
    ArticleFormComponent
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
    AuthGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
