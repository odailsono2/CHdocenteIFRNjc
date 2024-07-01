import { Component, ElementRef, OnChanges, OnInit, Signal, computed, inject, signal, viewChild } from '@angular/core';
import { Item } from '../services/tableFunctions';
import { TableJSONComponent } from '../tabela-from-json/tabela-from-json.component';
import { DataServices } from '../services/DataServices.service';
import { Utils } from '../services/functions.service';
import { Disciplina } from '../intefaces/InterfaceDisciplina';

interface Turmas {
  curso: string
  peridosLista: number[]
  anoEntrada: number
  numeroPeriodos: number
  ProfessoresLista: string[]

}

// interface CHdocente {
//   professor: string
//   cargaHoraria: {
//     [curso: string]: number
//   }
//   ChTotal: number

// }

interface CHdocente {
  professor: string
  [curso: string]: number | string
  ChTotal: number

}
@Component({
  selector: 'app-turmas',
  standalone: true,
  imports: [TableJSONComponent],
  templateUrl: './turmas.component.html',
  styleUrl: './turmas.component.css'
})
export class TurmasComponent implements OnInit{

  turmas = signal<Turmas[]>([])
  // keys : Signal<string[]>
  objTabelaProjecao = signal<Item[]>([])//[{'id':0,'valor':0},{'id':1,'valor':10}])

  keysCursos = signal<string[]>([])

  tabelaFInal: Item[] = []

  projDocente=signal<Item[]>([])

  inputText = viewChild.required<ElementRef>('InputNperiodos')
  numeroAnos = signal<number>(4)

  // periodos:number[] = []

  data = inject(DataServices)
  utils = inject(Utils)


  constructor() {

    // this.turmas.set([])

    this.objTabelaProjecao.set([])


    console.log("objTabelaProjecao: ", this.objTabelaProjecao())
    console.log("keysCursos: ", this.keysCursos)


  }



  ngOnInit(): void {
    // console.log("ngOnInt")

    this.atualizaTurmas()


    
  }
  ngDoCheck(){
    console.log('mudaram algo')
    this.atualizarCHdocente()
  }

  atualizaTurmas() {

    const newData = new Date()

    const anoAtual = newData.getFullYear()

    let per: number = 1;
    let periodos: string[] = []
    for (let index = 0; index < this.numeroAnos(); index++) {

      ['.1', '.2'].forEach((k) => {
        // const semestre = `${anoAtual + index}` + k +": " + '('+ (per++) +'º'+'periodo )'
        const semestre = (per++) + 'º'
        periodos.push(semestre)
      })

    }

    let tabelaAux: any = []
    periodos.forEach((periodo: string) => {
      tabelaAux.push([[periodo], 1])
      // console.log(periodo)
    })
    console.log('tabelaAux', Object.fromEntries(tabelaAux))

    //const objAux = Object.fromEntries(tabelaAux)

    this.keysCursos.set(this.getCursos())
    let objAux: Item[] = new Array<Item[]>()
    this.keysCursos().forEach((curso) => {
      const item = [['curso', curso], ...tabelaAux]
      const a = computed(() => Object.fromEntries(item))
      objAux.push(a())
      // console.log(item, curso)
    })
    // console.log('objAux', objAux)

    this.objTabelaProjecao.set([])
    this.objTabelaProjecao.set(objAux)
    this.tabelaFInal = this.objTabelaProjecao()

    this.atualizarCHdocente();


    // console.log("objTabelaProjecao: ", this.objTabelaProjecao())
    // console.log("keysCursos: ", this.keysCursos())
    // console.log("professores: ", professores.keys())

  }

  changePeriodos = () => {
    const a = <HTMLInputElement>this.inputText().nativeElement
    // console.log("inputTag: ", a.value)

    this.numeroAnos.set(Number(a.value))

    this.atualizaTurmas()
  }

  getCursos = () => (this.utils.getValusOfKey(this.data.getdataStore(), 'curso'))

  getProfessor = () => (this.utils.getValusOfKey(this.data.getdataStore(), 'professor'))

  incluirKeyat = (objArray: Item[], key: string, coluna: number) => this.utils.incluirKeyAtArray({ arrayObj: objArray, newkey: key, coluna: coluna })



  private atualizarCHdocente() {
    const key_professores = new Set(this.getProfessor());
    const dataDisciplinas = this.data.getdataStore();

    const professores = new Map<string, Disciplina[]>();

    const disciplinas: Disciplina[] = [];

    key_professores.forEach((key_prof) => {
      const disciplinas = dataDisciplinas.filter((disc) => disc['professor'] === key_prof);

      professores.set(key_prof, disciplinas as Disciplina[]);
    });


    const chDocente: CHdocente[] = [];

    professores.forEach((disList, professor) => {

      let chDocenteObj: CHdocente = {} as CHdocente;

      chDocenteObj.professor = professor;

      const CHcurso: number[] = [];

      const cargaHoraria: number[] = [];

      this.keysCursos().forEach((curso: string) => {

        const nturmas = computed(() => this.objTabelaProjecao().filter((obj) => obj['curso'] === curso)[0]);


        const discCurso = disList.filter((disc) => disc.curso === curso);

        [1, 2, 3, 4, 5, 6, 7, 8].forEach((per: number) => {

          // console.log('turmas, num', this.objTabelaProjecao().filter((obj) => obj['curso'] === curso)[0], nturmas()[per + 'º']);

          const discPeriodo = discCurso.filter((disc) => disc.periodo == per).reduce((acc: number, cur) => (acc + Number(cur.chTeorica) / 15.0), 0);

          const CHcursoPeriodo = nturmas()[per + 'º'] * discPeriodo;

          CHcurso.push(CHcursoPeriodo);

        });

        const CHcursoTotal = computed(() => CHcurso.reduce((acc, cur) => acc + Number(cur)));

        cargaHoraria.push(CHcursoTotal());


        chDocenteObj[curso] = CHcursoTotal();
        chDocenteObj = chDocenteObj;
        // console.log('Professor:', professor, 'Curso:', curso, 'Periodo:', per, "nturmas", nturmas()[per + 'º'], 'CHCursoTotal:',CHcursoTotal)
      });

      chDocenteObj.ChTotal = cargaHoraria.reduce((acc, cur) => acc + cur);

      // console.log('cargaHorariaEntries',cargaHoraria)
      // chDocenteObj = Object.fromEntries(cargaHoraria)
      chDocente.push(chDocenteObj);

      // console.log('professor: ', chDocenteObj)
      //fazer html para mostrar as CHdocentes e criar reatividade com as turmas cadastradas
    });



    this.projDocente.update(() => chDocente);
  }
}
