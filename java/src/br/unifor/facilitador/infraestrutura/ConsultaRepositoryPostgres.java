package br.unifor.facilitador.infraestrutura;

import br.unifor.facilitador.dominio.Consulta;
import br.unifor.facilitador.dominio.Medico;
import br.unifor.facilitador.porta.ConsultaRepository;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

/** Adaptador de persistencia real. SQL fica confinado aqui dentro. */
public class ConsultaRepositoryPostgres implements ConsultaRepository {

    private final String urlConexao;

    public ConsultaRepositoryPostgres(String urlConexao) {
        this.urlConexao = urlConexao;
    }

    @Override
    public void salvar(Consulta c) {
        System.out.println("[postgres] UPSERT consulta " + c.getId() + " em " + urlConexao);
    }

    @Override
    public Consulta buscarPorId(UUID id) {
        System.out.println("[postgres] SELECT consulta " + id);
        throw new UnsupportedOperationException("Requer driver JDBC configurado.");
    }

    @Override
    public List<Consulta> buscarPorMedicoNoDia(Medico m, LocalDate dia) {
        System.out.println("[postgres] SELECT agenda do CRM " + m.getCrm() + " em " + dia);
        return new ArrayList<>();
    }
}
