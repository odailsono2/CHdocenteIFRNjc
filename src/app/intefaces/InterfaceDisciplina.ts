// Disciplinas
import dadosTodasDisciplinas from "../../assets/DadosDisciplinas.json";

enum TipoDisciplina {
    Regular,
    Seminario,
    PraticaProfissinal
}
enum AreaDisciplonas {
    Administracao = "Administração",
    Direito = "Direito",
    EduFisica = "Educação Física",
    Eletroeletronica = "Eletroeletrônica",
    Eletrotecnica = "Eletrotécnica",
    EnergiasRenovaveis = "Energias Renováveis",
    Espanhol = "Espanhol",
    Estagio = "Estágio",
    Filosofia = "Filosofia",
    Fisica = "Física",
    Informatica = "Informática",
    Ingles = "Inglês",
    Libras = "Libras",
    Matematica = "Matemática",
    Mecanica = "Mecânica",
    MetodologiaCientifica = "Metodologia Científica",
    PI = "Projeto Integrador",
    Portugues = "Português",
    Psicologia = "Psicologia",
    QuimicaPetroleo = "Química-Petróleo",
    SegurançadoTrabalho = "Segurança do Trabalho",
    Seminario = "Seminário",
    Sociologia = "Sociologia",
    TCC = "Trabalho de Conclusão de Curso"
}

export interface Disciplinas {
    periodo: number,
    componente: string,
    tipo: string,
    optativo: string,
    chTeorica: number,
    area: string,
    curso: string

}

export const todasDisciplinas = JSON.parse(JSON.stringify(dadosTodasDisciplinas))

