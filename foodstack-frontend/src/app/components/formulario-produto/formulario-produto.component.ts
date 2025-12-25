import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router'; 

@Component({
  selector: 'app-formulario-produto',
  standalone: true, 
  imports: [CommonModule, FormsModule, RouterLink], 
  templateUrl: './formulario-produto.component.html',
  styleUrl: './formulario-produto.component.css',
})

export class FormularioProdutoComponent implements OnInit {

  produto = {
    nome: '',
    descricao: '',
    preco: 0,
    tipo: '',
    imagemUrl: ''
  };

  id?: number;

  constructor(
    private http: HttpClient, 
    private router: Router, 
    private activatedRoute: ActivatedRoute,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const idUrl = this.activatedRoute.snapshot.params['id'];

    if (idUrl) {
      this.id = Number(idUrl);
      
      this.http.get<any>(`http://localhost:8080/produtos/${this.id}`)
        .subscribe(dados => {

          this.produto.nome = dados.nome;
          this.produto.descricao = dados.descricao;
          this.produto.preco = dados.preco;
          this.produto.tipo = dados.tipo;
          this.produto.imagemUrl = dados.imagemUrl;

          this.cd.detectChanges();
        });
    }
  }

  salvarProduto() {
    
    if (this.id) {
      this.http.put(`http://localhost:8080/produtos/${this.id}`, this.produto).subscribe({
        next: () => {
          alert("Produto atualizado com sucesso!");
          this.router.navigate(["/admin"]);
        },
        error: (erro) => console.error(erro)
      });
    } else {
      this.http.post("http://localhost:8080/produtos", this.produto).subscribe({
        next: () => {
          alert("Produto cadastrado com sucesso!");
          this.router.navigate(["/admin"]);
        },
        error: (erro) => console.error(erro)
      });
    }
  }

  tratarErroImagem(event: any) {
    event.target.src = 'https://placehold.co/400?text=Sem+Foto';
  }
}