package br.com.gabrielguedes.foodstack.controller;

import br.com.gabrielguedes.foodstack.dto.LoginDto;
import br.com.gabrielguedes.foodstack.dto.RegistroDto;
import br.com.gabrielguedes.foodstack.model.Usuario;
import br.com.gabrielguedes.foodstack.service.TokenService;
import br.com.gabrielguedes.foodstack.service.UsuarioService;
import jakarta.validation.Valid;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UsuarioController {

    private UsuarioService usuarioService;
    private AuthenticationManager authenticationManager;
    private TokenService tokenService;

    public UsuarioController(UsuarioService usuarioService, AuthenticationManager authenticationManager, TokenService tokenService) {
        this.usuarioService = usuarioService;
        this.authenticationManager = authenticationManager;
        this.tokenService = tokenService;
    }

    @PostMapping("/registrar")
    public ResponseEntity<Usuario> salvarUsuario(@RequestBody RegistroDto dadosDoUsuario) {
        Usuario usuarioSalvo = usuarioService.registrarUsuario(dadosDoUsuario);
        return ResponseEntity.ok(usuarioSalvo);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody @Valid LoginDto dadosDoLogin) {
        var usernamePassword = new UsernamePasswordAuthenticationToken(dadosDoLogin.email(), dadosDoLogin.senha());

        var authentication = this.authenticationManager.authenticate(usernamePassword);

        var tokenJwt = tokenService.gerarToken((Usuario) authentication.getPrincipal());

        ResponseCookie cookie = ResponseCookie.from("jwt", tokenJwt)
                .httpOnly(true)
                .secure(false)
                .path("/")
                .maxAge(7200)
                .sameSite("Strict")
                .build();

        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, cookie.toString())
                .body("Login realizado com sucesso!");
    }

    @GetMapping("/me")
    public ResponseEntity<?> quemSouEu() {
        var autenticacao = SecurityContextHolder.getContext().getAuthentication();

        if (autenticacao != null && autenticacao.getPrincipal() instanceof Usuario) {
            Usuario usuarioLogado = (Usuario) autenticacao.getPrincipal();

            return ResponseEntity.ok(usuarioLogado);
        }

        return ResponseEntity.status(401).build();
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout() {
        ResponseCookie cookie = ResponseCookie.from("jwt", "")
                .httpOnly(true)
                .secure(false)
                .path("/")
                .maxAge(0)
                .sameSite("Strict")
                .build();

        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, cookie.toString())
                .body("Logout realizado com sucesso");
    }
}
