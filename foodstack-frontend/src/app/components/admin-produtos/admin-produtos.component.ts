import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-admin-produtos',
  imports: [CommonModule, RouterLink],
  templateUrl: './admin-produtos.component.html',
  styleUrl: './admin-produtos.component.css',
})
export class AdminProdutosComponent implements OnInit{

  constructor(private http: HttpClient){}

  produtos$!: Observable<any[]>;

  ngOnInit(): void {
    this.produtos$ = this.http.get<any[]>("http://localhost:8080/produtos");
  }

  deletarProduto(id: number) {
    this.http.delete(`http://localhost:8080/produtos/${id}`).subscribe(() => {

      console.log(`Produto ${id} deletado!`);

      this.ngOnInit();
    });
  }
}
