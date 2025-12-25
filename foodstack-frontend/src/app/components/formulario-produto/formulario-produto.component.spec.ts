import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioProdutoComponent } from './formulario-produto.component';

describe('FormularioProduto', () => {
  let component: FormularioProdutoComponent;
  let fixture: ComponentFixture<FormularioProdutoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormularioProdutoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormularioProdutoComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
