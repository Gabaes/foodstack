package br.com.gabrielguedes.foodstack.repository;

import br.com.gabrielguedes.foodstack.model.Produto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProdutoRepository extends JpaRepository<Produto, Long> {
}
