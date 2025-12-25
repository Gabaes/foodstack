package br.com.gabrielguedes.foodstack.service;

import br.com.gabrielguedes.foodstack.dto.ItemPedidoDto;
import br.com.gabrielguedes.foodstack.dto.PedidoDto;
import br.com.gabrielguedes.foodstack.model.*;
import br.com.gabrielguedes.foodstack.repository.ItemPedidoRepository;
import br.com.gabrielguedes.foodstack.repository.PedidoRepository;
import br.com.gabrielguedes.foodstack.repository.ProdutoRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class PedidoService {

    private final PedidoRepository pedidoRepository;
    private final ProdutoRepository produtoRepository;
    private final ItemPedidoRepository itemPedidoRepository;

    public PedidoService(PedidoRepository pedidoRepository, ProdutoRepository produtoRepository, ItemPedidoRepository itemPedidoRepository) {
        this.pedidoRepository = pedidoRepository;
        this.produtoRepository = produtoRepository;
        this.itemPedidoRepository = itemPedidoRepository;
    }

    @Transactional
    public Pedido criarPedido(Usuario usuario, PedidoDto pedidoDto) {

        Pedido novoPedido = new Pedido(usuario, LocalDateTime.now(), StatusPedido.PENDENTE);
        Pedido pedidoSalvo = pedidoRepository.save(novoPedido);

        for (ItemPedidoDto itemDto : pedidoDto.itens()) {

            Produto produto = produtoRepository.findById(itemDto.produtoId())
                    .orElseThrow(() -> new RuntimeException("Produto não encontrado"));

            ItemPedido novoItem = new ItemPedido();
            novoItem.setPedido(pedidoSalvo);
            novoItem.setProduto(produto);
            novoItem.setQuantidade(itemDto.quantidade());
            novoItem.setPrecoUnitario(produto.getPreco());

            itemPedidoRepository.save(novoItem);

            pedidoSalvo.getItens().add(novoItem);
        }

        return pedidoSalvo;
    }

    public List<Pedido> listarPorUsuario(Usuario usuario) {
        return pedidoRepository.findAllByUsuario(usuario);
    }

    public List<Pedido> listarTodos() {
        return pedidoRepository.findAll();
    }

    public void atualizarStatus(Long id, StatusPedido novoStatus) {
        Pedido pedido = pedidoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Pedido não encontrado"));

        pedido.setStatus(novoStatus);
        pedidoRepository.save(pedido);
    }
}
