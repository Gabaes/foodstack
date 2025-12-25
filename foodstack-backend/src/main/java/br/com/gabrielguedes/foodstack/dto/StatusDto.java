package br.com.gabrielguedes.foodstack.dto;

import br.com.gabrielguedes.foodstack.model.StatusPedido;
import jakarta.validation.constraints.NotNull;

public record StatusDto(
        @NotNull
        StatusPedido status
) { }
