import { DisciplinasInterface } from "./InterfaceDisciplina";

export interface TurmasInterface {
    curso?: string,
    qtdPeriodos?: number,
    professores?: string[],
    disciplinas?: Map<number,DisciplinasInterface>

}

class Turmas implements TurmasInterface{

    constructor(turma:TurmasInterface){
        
    }

 
}