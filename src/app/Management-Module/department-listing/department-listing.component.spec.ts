import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentListingComponent } from './department-listing.component';

describe('DepartmentListingComponent', () => {
  let component: DepartmentListingComponent;
  let fixture: ComponentFixture<DepartmentListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DepartmentListingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DepartmentListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
