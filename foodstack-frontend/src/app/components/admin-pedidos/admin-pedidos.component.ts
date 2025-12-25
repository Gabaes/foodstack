import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs'; 
import { PedidoService } from '../../services/pedido.service';

@Component({
  selector: 'app-admin-pedidos',
  standalone: true,
  imports: [CommonModule], 
  templateUrl: './admin-pedidos.component.html',
  styleUrl: './admin-pedidos.component.css'
})
export class AdminPedidosComponent implements OnInit {

  pedidos$!: Observable<any[]>;

  constructor(private pedidoService: PedidoService) {}

  ngOnInit(): void {
    this.pedidos$ = this.pedidoService.listar();
  }

  mudarStatus(pedido: any, novoStatus: string) {
    if (!confirm(`Confirmar mudança para ${novoStatus}?`)) return;

    const statusAntigo = pedido.status;

    pedido.status = novoStatus; 

    this.pedidoService.atualizarStatus(pedido.id, novoStatus).subscribe({
      next: () => {
        setTimeout(() => {
          this.pedidos$ = this.pedidoService.listar();
        }, 1000); 
      },
      error: (erro) => {
        pedido.status = statusAntigo;
        console.error('Erro:', erro);
        alert('Erro ao atualizar status.');
      }
    });
  }
}