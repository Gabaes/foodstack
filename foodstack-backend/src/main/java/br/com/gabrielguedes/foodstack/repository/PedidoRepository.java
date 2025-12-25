package br.com.gabrielguedes.foodstack.repository;

import br.com.gabrielguedes.foodstack.model.Pedido;
import br.com.gabrielguedes.foodstack.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PedidoRepository extends JpaRepository<Pedido,Long> {
    List<Pedido> findAllByUsuario(Usuario usuario);
}
