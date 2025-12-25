package br.com.gabrielguedes.foodstack.controller;

import br.com.gabrielguedes.foodstack.dto.PedidoDto;
import br.com.gabrielguedes.foodstack.dto.StatusDto;
import br.com.gabrielguedes.foodstack.model.Pedido;
import br.com.gabrielguedes.foodstack.model.StatusPedido;
import br.com.gabrielguedes.foodstack.model.Usuario;
import br.com.gabrielguedes.foodstack.service.PedidoService;
import br.com.gabrielguedes.foodstack.service.UsuarioService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;
import java.util.Map;

@RestController
public class PedidoController {

    private PedidoService pedidoService;
    private UsuarioService usuarioService;

    public PedidoController(PedidoService pedidoService, UsuarioService usuarioService) {
        this.pedidoService = pedidoService;
        this.usuarioService = usuarioService;
    }

    @GetMapping("/pedidos")
    public ResponseEntity<List<Pedido>> listarPedidos(Principal principal) {
        Usuario usuarioLogado = usuarioService.buscarPorEmail(principal.getName());

        String roleAtual = usuarioLogado.getRole().toString();

        if (roleAtual.equals("ROLE_ADMIN")) {
            return ResponseEntity.ok(pedidoService.listarTodos());
        } else {
            return ResponseEntity.ok(pedidoService.listarPorUsuario(usuarioLogado));
        }
    }

    @PostMapping("/pedidos")
    public ResponseEntity<Pedido> criarPedido(@RequestBody PedidoDto pedidoDto, Principal principal) {
        Usuario usuario = usuarioService.buscarPorEmail(principal.getName());
        Pedido pedidoCriado = pedidoService.criarPedido(usuario, pedidoDto);
        return ResponseEntity.ok(pedidoCriado);
    }

    @PatchMapping("/pedidos/{id}/status")
    public ResponseEntity<Void> atualizarStatus(@PathVariable Long id, @RequestBody Map<String, String> payload) {
        String statusTexto = payload.get("status");

        try {
            StatusPedido novoStatus = StatusPedido.valueOf(statusTexto.toUpperCase());

            pedidoService.atualizarStatus(id, novoStatus);
            return ResponseEntity.noContent().build();

        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }
    }
}
