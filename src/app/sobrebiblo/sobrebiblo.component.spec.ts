import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SobrebibloComponent } from './sobrebiblo.component';

describe('SobrebibloComponent', () => {
  let component: SobrebibloComponent;
  let fixture: ComponentFixture<SobrebibloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SobrebibloComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SobrebibloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
