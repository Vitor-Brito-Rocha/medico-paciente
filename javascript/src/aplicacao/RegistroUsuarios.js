/**
 * Faz a ponte perfil -> usuario, consequencia de termos trocado heranca por
 * composicao de papeis. Mantido simples de proposito (escopo academico).
 */
const USUARIOS = [];

export const RegistroUsuarios = Object.freeze({
  registrar(usuario) {
    USUARIOS.push(usuario);
  },

  donoDoPerfil(paciente) {
    return USUARIOS.find((u) => u.perfilPaciente === paciente) ?? null;
  },
});
