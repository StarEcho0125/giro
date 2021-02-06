import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogdolibarrarticleComponent } from './blogdolibarrarticle.component';

describe('BlogdolibarrarticleComponent', () => {
  let component: BlogdolibarrarticleComponent;
  let fixture: ComponentFixture<BlogdolibarrarticleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlogdolibarrarticleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogdolibarrarticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
