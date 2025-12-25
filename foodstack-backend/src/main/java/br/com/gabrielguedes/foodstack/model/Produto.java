package br.com.gabrielguedes.foodstack.model;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Data;
import lombok.Setter;

import java.math.BigDecimal;

@Entity
@Data
public class Produto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Setter(AccessLevel.NONE)
    private Long id;

    private String nome;
    private String descricao;
    private BigDecimal preco;

    @Enumerated(EnumType.STRING)
    private Categoria tipo;
    private String imagemUrl;
}
