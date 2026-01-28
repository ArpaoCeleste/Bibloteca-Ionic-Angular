import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequisitarlivroComponent } from './requisitarlivro.component';

describe('RequisitarlivroComponent', () => {
  let component: RequisitarlivroComponent;
  let fixture: ComponentFixture<RequisitarlivroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RequisitarlivroComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequisitarlivroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
