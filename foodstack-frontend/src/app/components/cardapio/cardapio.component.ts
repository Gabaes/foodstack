import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { CarrinhoService } from '../../services/carrinho.service';

// Define o formato do nosso grupo
interface GrupoCardapio {
  categoria: string;
  produtos: any[];
}

@Component({
  selector: 'app-cardapio',
  standalone: true,
  imports: [CommonModule], 
  templateUrl: './cardapio.component.html',
  styleUrl: './cardapio.component.css',
})
export class CardapioComponent implements OnInit {

  grupos: GrupoCardapio[] = [];

  ordemCategorias = ['LANCHE', 'PIZZA', 'JAPONESA', 'ACOMPANHAMENTO', 'BEBIDA', 'SOBREMESA'];

  traducoesCategorias: any = {
    'LANCHE': '🍔 Hambúrgueres',
    'BEBIDA': '🥤 Bebidas',
    'SOBREMESA': '🍩 Sobremesas',
    'ACOMPANHAMENTO': '🍟 Acompanhamentos',
    'PIZZA': '🍕 Pizzas',
    'JAPONESA': '🍣 Japonesa'
  };

  constructor(
  private http: HttpClient, 
  private carrinho: CarrinhoService,
  private cdr: ChangeDetectorRef 
  ) {}

  ngOnInit(): void {
    this.http.get<any[]>('http://localhost:8080/produtos').subscribe({
      next: (dados) => {
        this.separarPorCategoria(dados);
      },
      error: (erro) => {
        console.error("❌ DEU RUIM NO BACKEND:", erro);
        alert("Erro ao buscar produtos! Verifique o console.");
      }
    });
  }

  separarPorCategoria(todosProdutos: any[]) {
    const categoriasUnicas = [...new Set(todosProdutos.map(p => p.tipo))];

    this.grupos = categoriasUnicas.map(categoria => {
      return {
        categoria: categoria,
        produtos: todosProdutos.filter(p => p.tipo === categoria)
      };
    });

    this.grupos.sort((a, b) => {
      let indexA = this.ordemCategorias.indexOf(a.categoria);
      let indexB = this.ordemCategorias.indexOf(b.categoria);

      if (indexA === -1) indexA = 999;
      if (indexB === -1) indexB = 999;

      return indexA - indexB; 
    });

    this.cdr.detectChanges();
  }

  adicionarAoCarrinho(produto: any) {
    this.carrinho.adicionarItem(produto);
  }

  tratarErroImagem(event: any) {
    event.target.src = 'https://placehold.co/400?text=Sem+Foto';
  }
}