import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-registro', 
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './registro.component.html', 
  styleUrl: './registro.component.css',    
})

export class RegistroComponent implements OnInit {

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.http.post('http://localhost:8080/logout', {}).subscribe({
        next: () => console.log("Sessão limpa para novo cadastro"),
        error: () => console.log("Nenhuma sessão anterior para limpar")
    });
  }

  registroData = {
    nome: '',     
    email: '', 
    senha: '', 
    role: 'ROLE_CLIENTE'
  };

  registrar() {
    this.http.post('http://localhost:8080/registrar', this.registroData)
      .subscribe({
        next: (resposta) => {
          alert("Conta criada com sucesso!");
          this.router.navigate(['/login']);
        },
        error: (erro) => {
          alert("Erro ao criar conta. Verifique os dados.");
          console.error(erro);
        }
      });
  }
}