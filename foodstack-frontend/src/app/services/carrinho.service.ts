import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs'; 

@Injectable({
  providedIn: 'root',
})
export class CarrinhoService {
  
  private carrinhoSubject = new BehaviorSubject<any[]>([]);

  carrinho$ = this.carrinhoSubject.asObservable();

  constructor(private http: HttpClient) {
    const dadosSalvos = localStorage.getItem("carrinho");

    if (dadosSalvos) {
      this.carrinhoSubject.next(JSON.parse(dadosSalvos));
    }
  }

  public adicionarItem(produto: any) {
    const itensAtuais = this.carrinhoSubject.value;
    
    const novaLista = [...itensAtuais, produto];

    this.carrinhoSubject.next(novaLista);
    
    this.salvarCarrinho(novaLista);
  }

  public removerItem(index: number) {
    const itensAtuais = this.carrinhoSubject.value;
    
    itensAtuais.splice(index, 1);
    
    this.carrinhoSubject.next(itensAtuais);
    this.salvarCarrinho(itensAtuais);
  }

  public obterTotal(): number {
    return this.carrinhoSubject.value.reduce((total, item) => total + item.preco, 0);
  }

  public finalizarPedido() {
    const itensAtuais = this.carrinhoSubject.value;

    const pedidoDto = {
      itens: itensAtuais.map(produto => ({
        produtoId: produto.id,
        quantidade: 1
      }))
    };

    return this.http.post('http://localhost:8080/pedidos', pedidoDto);
  }

  public limparCarrinho() {
    this.carrinhoSubject.next([]);
    localStorage.removeItem("carrinho");
  }

  private salvarCarrinho(itens: any[]) {
    localStorage.setItem("carrinho", JSON.stringify(itens));
  }
}