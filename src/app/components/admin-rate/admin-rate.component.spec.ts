import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRateComponent } from './admin-rate.component';

describe('AdminRateComponent', () => {
  let component: AdminRateComponent;
  let fixture: ComponentFixture<AdminRateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminRateComponent]
    });
    fixture = TestBed.createComponent(AdminRateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
