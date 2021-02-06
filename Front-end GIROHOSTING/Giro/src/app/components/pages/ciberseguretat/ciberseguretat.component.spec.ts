import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CiberseguretatComponent } from './ciberseguretat.component';

describe('CiberseguretatComponent', () => {
  let component: CiberseguretatComponent;
  let fixture: ComponentFixture<CiberseguretatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CiberseguretatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CiberseguretatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
