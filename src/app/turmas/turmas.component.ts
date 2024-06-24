import { Component, OnInit, Signal, computed, inject, signal } from '@angular/core';
import { Item, incluirKeyAtArray } from '../services/tableFunctions';
import { TableJSONComponent } from '../tabela-from-json/tabela-from-json.component';
import { DataServices } from '../services/DataServices.service';
import { Utils } from '../services/functions.service';
import { SignalNode } from '@angular/core/primitives/signals';

interface Turmas {
  'curso': string
  'peridosLista': number[]
  'anoEntrada': number
  'numeroDEPeriodos': number
  'ProfessoresLista': string[]

}
@Component({
  selector: 'app-turmas',
  standalone: true,
  imports: [TableJSONComponent],
  templateUrl: './turmas.component.html',
  styleUrl: './turmas.component.css'
})
export class TurmasComponent implements OnInit {

  turmas = signal<Turmas[]>([])
  // keys : Signal<string[]>
  objTabelaProjecao = signal<Item[]>([])//[{'id':0,'valor':0},{'id':1,'valor':10}])

  keysCursos: string[] = []

  // periodos:number[] = []

  data = inject(DataServices)
  utils = inject(Utils)


  constructor() {
    console.log("construtor: ")

    this.turmas.set([])

    this.objTabelaProjecao.set([])


    console.log("objTabelaProjecao: ", this.objTabelaProjecao())
    console.log("keysCursos: ", this.keysCursos)


  }



  ngOnInit(): void {
    console.log("ngOnInt")

    const newData = new Date()

    const anoAtual = newData.getFullYear()

    let periodos:any[] = []
    const sem = ['(1º sem)', '(2º sem)']
    for (let index = 0; index < 4; index++) {
      sem.forEach((k) => {
        const semestre = `${anoAtual + index}-`+k
        periodos.push(semestre)
      })


    }

    let k = this.objTabelaProjecao.length
    periodos.forEach((item) => {
      this.objTabelaProjecao.set(this.incluirKeyat(item, k++))
    })


    this.keysCursos = this.getCursos()

    this.objTabelaProjecao.set(this.incluirKeyat('turma', 0))
 
    const aux = this.utils.atribuiValoresNakey(this.objTabelaProjecao(), this.keysCursos, 'turma')
    this.objTabelaProjecao.set(aux)

    

    console.log("objTabelaProjecao: ", this.objTabelaProjecao())
    console.log("keysCursos: ", this.keysCursos)

  }

  getCursos = () => (this.utils.getValusOfKey(this.data.getdataStore(), 'curso'))

  incluirKeyat = (key: string, coluna: number) => this.utils.incluirKeyAtArray({ arrayObj: this.objTabelaProjecao(), newkey: key, coluna: coluna })


}
