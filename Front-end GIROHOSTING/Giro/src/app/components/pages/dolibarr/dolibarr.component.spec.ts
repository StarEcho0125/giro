import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DolibarrComponent } from './dolibarr.component';

describe('DolibarrComponent', () => {
  let component: DolibarrComponent;
  let fixture: ComponentFixture<DolibarrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DolibarrComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DolibarrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
