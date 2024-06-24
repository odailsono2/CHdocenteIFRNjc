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


}

export class Disciplina implements DisciplinasInterface {
    periodo: number;

    componente!: string;

    tipo!: TipoDisciplina;

    optativo!: string;

    chTeorica!: number;

    area!: AreaDisciplonas;

    curso!: string;


    constructor({ componente, periodo, tipo, optativo, chTeorica, area, curso }: DisciplinasInterface) {
        this.componente = componente
        this.tipo = tipo
        this.optativo = optativo
        this.chTeorica = chTeorica
        this.area = area
        this.curso = curso
        this.periodo = periodo


    }


    // public get componente(): string {
    //     return this._componente;
    // }
    // public set componente(value: string) {
    //     this._componente = value;
    // }

    // public get periodo(): number {
    //     return this.periodo;
    // }
    // public set periodo(value: number) {
    //     this.periodo = value;
    // }

    // public get chTeorica(): number {
    //     return this._chTeorica;
    // }
    // public set chTeorica(value: number) {
    //     this._chTeorica = value;
    // }
    // public get curso(): string {
    //     return this._curso;
    // }
    // public set curso(value: string) {
    //     this._curso = value;
    // }
    // public get area(): AreaDisciplonas {
    //     return this._area;
    // }
    // public set area(value: AreaDisciplonas) {
    //     this._area = value;
    // }
    // public get optativo(): string {
    //     return this._optativo;
    // }
    // public set optativo(value: string) {
    //     this._optativo = value;
    // }
    // public get tipo(): TipoDisciplina {
    //     return this._tipo;
    // }
    // public set tipo(value: TipoDisciplina) {
    //     this._tipo = value;
    // }

    [Symbol.iterator](): Iterator<any> {
        const properties = Object.entries(this)
          .filter(([key, _]) => !key.startsWith('_'));
        let index = 0;
    
        return {
          next: (): IteratorResult<any> => {
            if (index < properties.length) {
              return {
                value: properties[index++],
                done: false
              };
            } else {
              return {
                value: undefined, // Add value property when done is true
                done: true
              };
            }
          }
        };
    }

}


export const todasDisciplinas = JSON.parse(JSON.stringify(dadosTodasDisciplinas))

export const disciplina1 = new Disciplina(todasDisciplinas[0])
