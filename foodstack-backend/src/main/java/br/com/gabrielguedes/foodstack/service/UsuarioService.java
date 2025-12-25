package br.com.gabrielguedes.foodstack.service;

import br.com.gabrielguedes.foodstack.dto.RegistroDto;
import br.com.gabrielguedes.foodstack.model.Usuario;
import br.com.gabrielguedes.foodstack.repository.UsuarioRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;

    public UsuarioService(UsuarioRepository usuarioRepository, PasswordEncoder passwordEncoder) {
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public Usuario registrarUsuario(RegistroDto registroDto) {
        Usuario novoUsuario = new Usuario();
        novoUsuario.setNome(registroDto.nome()); // <--- SALVANDO O NOME
        novoUsuario.setEmail(registroDto.email());
        novoUsuario.setSenha(passwordEncoder.encode(registroDto.senha()));
        novoUsuario.setRole(registroDto.role());

        return usuarioRepository.save(novoUsuario);
    }

    public Usuario buscarPorEmail(String email) {
        return usuarioRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
    }
}
