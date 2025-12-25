import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CarrinhoService } from '../../services/carrinho.service';
import { Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})

export class HeaderComponent implements OnInit {

  usuarioLogado: any = null; 
  
  itensNoCarrinho = 0;

  constructor(
    private http: HttpClient, 
    private router: Router,
    public carrinhoService: CarrinhoService,
    private cdr: ChangeDetectorRef 
  ) {}

  ngOnInit(): void {
    this.carrinhoService.carrinho$.subscribe(itens => {
      this.itensNoCarrinho = itens.length;
    });

    this.verificarUsuarioLogado();
  }

  verificarUsuarioLogado() {
        this.http.get('http://localhost:8080/me').subscribe({
            next: (usuario: any) => {
                this.usuarioLogado = usuario;
                this.cdr.detectChanges(); 
            },
            error: () => {
                this.usuarioLogado = null;
                this.cdr.detectChanges(); 
            }
        });
  }

  fazerLogout() {
    this.http.post('http://localhost:8080/logout', {}).subscribe({
      next: () => {
        this.limparSessao();
      },
      error: () => {
        this.limparSessao();
      }
    });
  }

  limparSessao() {
    this.usuarioLogado = null;
    this.router.navigate(['/login']);
  }
}
