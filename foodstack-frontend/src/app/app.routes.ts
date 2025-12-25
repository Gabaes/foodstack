import { Routes } from '@angular/router';
import { CardapioComponent } from './components/cardapio/cardapio.component';
import { CarrinhoComponent } from './components/carrinho/carrinho.component';
import { MeusPedidosComponent } from './components/meus-pedidos/meus-pedidos.component';
import { LoginComponent } from './components/login/login.component';
import { AdminProdutosComponent } from './components/admin-produtos/admin-produtos.component';
import { FormularioProdutoComponent } from './components/formulario-produto/formulario-produto.component';
import { adminGuard } from './guards/admin-guard';
import { RegistroComponent } from './components/registro/registro.component';
import { AcessoNegadoComponent } from './components/acesso-negado/acesso-negado.component';
import { AdminPedidosComponent } from './components/admin-pedidos/admin-pedidos.component';

export const routes: Routes = [
    {
        path: "",
        component: CardapioComponent
    },
    {
        path: "carrinho",
        component: CarrinhoComponent
    },
    {
        path: "meus-pedidos",
        component: MeusPedidosComponent
    },
    {
        path: "login",
        component: LoginComponent
    },
    { 
        path: "admin", 
        component: AdminProdutosComponent,
        canActivate: [adminGuard] 
    },
    {
        path: "admin/novo",
        component: FormularioProdutoComponent,
        canActivate: [adminGuard]
    },
    { 
        path: "admin/editar/:id", 
        component: FormularioProdutoComponent, 
        canActivate: [adminGuard]
    },
    { 
        path: "admin/pedidos", 
        component: AdminPedidosComponent,
        canActivate: [adminGuard] 
    },
    { 
        path: "registrar", 
        component: RegistroComponent 
    },
    { 
        path: "acesso-negado", 
        component: AcessoNegadoComponent 
    }
];
