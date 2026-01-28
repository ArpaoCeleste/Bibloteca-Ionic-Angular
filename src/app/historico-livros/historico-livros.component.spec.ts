import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricoLivrosComponent } from './historico-livros.component';

describe('HistoricoLivrosComponent', () => {
  let component: HistoricoLivrosComponent;
  let fixture: ComponentFixture<HistoricoLivrosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistoricoLivrosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoricoLivrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
