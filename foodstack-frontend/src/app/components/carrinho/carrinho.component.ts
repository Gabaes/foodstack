import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CarrinhoService } from '../../services/carrinho.service';

@Component({
  selector: 'app-carrinho',
  standalone: true,
  imports: [CommonModule, RouterLink], 
  templateUrl: './carrinho.component.html',
  styleUrl: './carrinho.component.css',
})
export class CarrinhoComponent implements OnInit {

  itensDoCarrinho: any[] = [];
  total: number = 0;

  constructor(private carrinhoService: CarrinhoService) {}

  ngOnInit(): void {
    this.carrinhoService.carrinho$.subscribe(itens => {
      this.itensDoCarrinho = itens;
      this.total = this.carrinhoService.obterTotal();
    });
  }

  fecharPedido() {
    this.carrinhoService.finalizarPedido().subscribe({
      next: (resposta) => {
        alert('Pedido realizado com sucesso!');
        
        this.carrinhoService.limparCarrinho(); 

        this.itensDoCarrinho = [];
        this.total = 0;
      },
      error: (erro) => {
        alert('Erro ao processar pedido. Você está logado?');
        console.error(erro);
      }
    });
  }
  
  removerPedido(index: number) {
    this.carrinhoService.removerItem(index);
  }
}
