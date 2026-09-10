package br.unifor.facilitador.infraestrutura;

import br.unifor.facilitador.dominio.Consulta;
import br.unifor.facilitador.dominio.Medico;
import br.unifor.facilitador.porta.ConsultaRepository;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

/**
 * LSP: substitui a versao Postgres sem quebrar nada. E por isso que da pra rodar
 * o sistema inteiro em teste, sem banco.
 */
public class ConsultaRepositoryMemoria implements ConsultaRepository {

    private final List<Consulta> consultas = new ArrayList<>();

    @Override
    public void salvar(Consulta c) {
        if (!consultas.contains(c)) {
            consultas.add(c);
        }
    }

    @Override
    public Consulta buscarPorId(UUID id) {
        return consultas.stream()
                .filter(c -> c.getId().equals(id))
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException("Consulta nao encontrada: " + id));
    }

    @Override
    public List<Consulta> buscarPorMedicoNoDia(Medico m, LocalDate dia) {
        List<Consulta> achadas = new ArrayList<>();
        for (Consulta c : consultas) {
            if (c.getMedico() == m && c.getDataHora().toLocalDate().equals(dia)) {
                achadas.add(c);
            }
        }
        return achadas;
    }
}
