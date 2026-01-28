import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriarlibrariaComponent } from './criarlibraria.component';

describe('CriarlibrariaComponent', () => {
  let component: CriarlibrariaComponent;
  let fixture: ComponentFixture<CriarlibrariaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CriarlibrariaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CriarlibrariaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
