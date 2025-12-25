package br.com.gabrielguedes.foodstack.controller;

import br.com.gabrielguedes.foodstack.model.Produto;
import br.com.gabrielguedes.foodstack.repository.ProdutoRepository;
import br.com.gabrielguedes.foodstack.service.ProdutoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ProdutoController {

    private ProdutoService produtoService;
    private ProdutoRepository produtoRepository;

    public ProdutoController(ProdutoService produtoService, ProdutoRepository produtoRepository) {
        this.produtoService = produtoService;
        this.produtoRepository = produtoRepository;
    }

    @GetMapping("/produtos")
    public ResponseEntity<List<Produto>> listarProdutos() {
        List<Produto> buscaProduto = produtoService.listarTodos();
        return ResponseEntity.ok(buscaProduto);
    }

    @GetMapping("/produtos/{id}")
    public ResponseEntity<Produto> buscarPorId(@PathVariable Long id) {
        return produtoRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/produtos")
    public ResponseEntity<Produto> salvarProduto(@RequestBody Produto produtoRecebido) {
        Produto produtoSalvo = produtoService.salvarProduto(produtoRecebido);
        return ResponseEntity.ok(produtoSalvo);
    }

    @DeleteMapping("/produtos/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        produtoService.deletar(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/produtos/{id}")
    public ResponseEntity<Produto> atualizar(@PathVariable Long id, @RequestBody Produto produto) {
        Produto produtoAtualizado = produtoService.atualizar(id, produto);
        return ResponseEntity.ok(produtoAtualizado);
    }
}
