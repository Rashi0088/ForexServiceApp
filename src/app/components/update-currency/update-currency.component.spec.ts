import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCurrencyComponent } from './update-currency.component';

describe('UpdateCurrencyComponent', () => {
  let component: UpdateCurrencyComponent;
  let fixture: ComponentFixture<UpdateCurrencyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateCurrencyComponent]
    });
    fixture = TestBed.createComponent(UpdateCurrencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
