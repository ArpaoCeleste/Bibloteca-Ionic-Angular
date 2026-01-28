import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserlivrosComponent } from './userlivros.component';

describe('UserlivrosComponent', () => {
  let component: UserlivrosComponent;
  let fixture: ComponentFixture<UserlivrosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserlivrosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserlivrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
