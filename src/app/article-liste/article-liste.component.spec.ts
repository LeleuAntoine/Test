import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleListeComponent } from './article-liste.component';

describe('ArticleListeComponent', () => {
  let component: ArticleListeComponent;
  let fixture: ComponentFixture<ArticleListeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticleListeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleListeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
