import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})

export class LoginComponent implements OnInit {

  constructor(private http: HttpClient, private router: Router){}

  dadosLogin = { 
    email: '', 
    senha: ''
  };

  ngOnInit(): void {
    this.http.post('http://localhost:8080/logout', {}).subscribe({
      next: () => console.log("Sessão limpa para novo login."),
      error: () => console.log("Nenhuma sessão ativa para limpar.")
    });
  }

  fazerLogin() {
    this.http.post('http://localhost:8080/login', this.dadosLogin, { responseType: 'text' })
      .subscribe({
        next: (resposta) => {
          
          console.log("Login feito! Recarregando para pegar o cookie...");

          window.location.href = '/';
        },
        error: (erro) => {
          alert("Email ou senha inválidos");
        }
      });
  }
}
