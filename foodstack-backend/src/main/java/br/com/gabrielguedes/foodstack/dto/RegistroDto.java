package br.com.gabrielguedes.foodstack.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record RegistroDto(
        @NotBlank(message = "O nome é obrigatório")
        String nome,

        @NotBlank
        @Email
        String email,

        @NotBlank
        String senha,

        String role
) {
}
