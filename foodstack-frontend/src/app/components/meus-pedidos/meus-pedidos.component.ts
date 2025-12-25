import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PedidoService } from '../../services/pedido.service';

@Component({
  selector: 'app-meus-pedidos',
  standalone: true, 
  imports: [CommonModule],
  templateUrl: './meus-pedidos.component.html',
  styleUrl: './meus-pedidos.component.css',
})
export class MeusPedidosComponent implements OnInit {

  constructor(private pedidoService: PedidoService) {}

  pedidos$!: Observable<any[]>; 

  ngOnInit(): void {
    this.pedidos$ = this.pedidoService.listar();
  }
}
