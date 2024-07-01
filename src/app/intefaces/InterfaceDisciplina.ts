// Disciplinas
import dadosTodasDisciplinas from "../../assets/DadosDisciplinas.json";

import { Item } from "../services/tableFunctions";

enum TipoDisciplina {
    Regular = "Regular",
    Seminario = "Seminário",
    PraticaProfissinal = "Prática Profissional"
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

export interface DisciplinasInterface extends Item{
    periodo: number,
    componente: string,
    tipo: TipoDisciplina,
    optativo: string,
    chTeorica: number,
    area: AreaDisciplonas,
    curso: string
    professor?: string


}

export class Disciplina implements DisciplinasInterface {
    periodo: number;

    componente!: string;

    tipo!: TipoDisciplina;

    optativo!: string;

    chTeorica!: number;

    area!: AreaDisciplonas;

    curso!: string;

    professor?: string | undefined;


    constructor({ componente, periodo, tipo, optativo, chTeorica, area, curso, professor }: DisciplinasInterface) {
        this.componente = componente
        this.tipo = tipo
        this.optativo = optativo
        this.chTeorica = Number( chTeorica)
        this.area = area
        this.curso = curso
        this.periodo = Number(periodo)
        this.professor = professor
    }

    
}


export const todasDisciplinas = JSON.parse(JSON.stringify(dadosTodasDisciplinas))

export const disciplina1 = new Disciplina(todasDisciplinas[0])
