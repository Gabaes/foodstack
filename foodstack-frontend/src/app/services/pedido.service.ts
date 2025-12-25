import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  
  private apiUrl = 'http://localhost:8080/pedidos'; 

  constructor(private http: HttpClient) {}

  listar(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  atualizarStatus(idPedido: number, novoStatus: string): Observable<void> {
    
    const urlPatch = `${this.apiUrl}/${idPedido}/status`;
    
    const payload = { 
        status: novoStatus 
    };
    
    return this.http.patch<void>(urlPatch, payload);
  }

  criarPedido(pedidoDto: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, pedidoDto);
  }
}