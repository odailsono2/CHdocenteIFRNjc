import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarregaArquivoComponent } from './carrega-arquivo.component';

describe('CarregaArquivoComponent', () => {
  let component: CarregaArquivoComponent;
  let fixture: ComponentFixture<CarregaArquivoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarregaArquivoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CarregaArquivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
