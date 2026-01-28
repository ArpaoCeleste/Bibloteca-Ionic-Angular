import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LivrospageComponent } from './livrospage.component';

describe('LivrospageComponent', () => {
  let component: LivrospageComponent;
  let fixture: ComponentFixture<LivrospageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LivrospageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LivrospageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
