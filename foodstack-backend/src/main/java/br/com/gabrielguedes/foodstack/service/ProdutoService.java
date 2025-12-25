package br.com.gabrielguedes.foodstack.service;

import br.com.gabrielguedes.foodstack.model.Produto;
import br.com.gabrielguedes.foodstack.repository.ProdutoRepository;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProdutoService {

    private final ProdutoRepository produtoRepository;;

    public ProdutoService(ProdutoRepository produtoRepository) { this.produtoRepository = produtoRepository; }

    public List<Produto> listarTodos() {
        return produtoRepository.findAll(Sort.by(Sort.Direction.ASC, "id"));
    }

    public Produto salvarProduto(Produto novoProduto) {
        return produtoRepository.save(novoProduto);
    }

    public void deletar(Long id) {
        produtoRepository.deleteById(id);
    }

    public Produto atualizar(Long id, Produto produtoAlterado) {

        Produto produtoExistente = produtoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Produto não encontrado"));

        produtoExistente.setNome(produtoAlterado.getNome());
        produtoExistente.setDescricao(produtoAlterado.getDescricao());
        produtoExistente.setPreco(produtoAlterado.getPreco());
        produtoExistente.setTipo(produtoAlterado.getTipo());
        produtoExistente.setImagemUrl(produtoAlterado.getImagemUrl());

        return produtoRepository.save(produtoExistente);
    }
}
