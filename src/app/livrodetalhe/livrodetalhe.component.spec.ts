import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LivrodetalheComponent } from './livrodetalhe.component';

describe('LivrodetalheComponent', () => {
  let component: LivrodetalheComponent;
  let fixture: ComponentFixture<LivrodetalheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LivrodetalheComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LivrodetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
