import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalhespesquisaComponent } from './detalhespesquisa.component';

describe('DetalhespesquisaComponent', () => {
  let component: DetalhespesquisaComponent;
  let fixture: ComponentFixture<DetalhespesquisaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalhespesquisaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalhespesquisaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
