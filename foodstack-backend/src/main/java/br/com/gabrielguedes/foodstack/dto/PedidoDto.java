package br.com.gabrielguedes.foodstack.dto;

import java.util.List;

public record PedidoDto(List<ItemPedidoDto> itens) {
}
