import { AfterViewInit, Component, OnInit, Signal, computed, inject, signal } from '@angular/core';
import { Item, incluirKeyAtArray } from '../services/tableFunctions';
import { TableJSONComponent } from '../tabela-from-json/tabela-from-json.component';
import { Router } from '@angular/router';
import { DataServices } from '../services/DataServices.service';

const professores_test: string[] = [
  'Odailson',
  'João Paulo',
  'Leonardo',
  'Martins',
  'Humberto',
  'Guilherme',
  'Dennys',
  'Samya',
  'Ericka',
  'Erisson',
  'Fernanda',
  'Carlos',
  'Patrícia',
  'Lucas',
  'Beatriz',
  'Rafael',
  'Tatiana',
  'Cláudio',
  'Isabela',
  'Fernando',
  'Marina',
  'Gabriel',
  'Renata',
  'Felipe',
  'Bianca',
  'Eduardo',
  'Carolina',
  'Rodrigo',
  'Michele',
  'Bruno'
];


function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

@Component({
  selector: 'app-listar-disciplinas',
  standalone: true,
  imports: [TableJSONComponent],
  templateUrl: './listar-disciplinas.component.html',
  styleUrl: './listar-disciplinas.component.css'
})
export class ListarDisciplinasComponent {


  listaDisciplinas: Item[] = []
  // keys: Signal<string[]> | undefined 
  keys: string[] = []
  // dadosRecebidos: any[] =[]

  router = inject(Router)

  dados = inject(DataServices)

  //  chaves = computed(()=>Object.keys(this.listaDisciplinas[0]))



  constructor() {
    const navigation = this.router.getCurrentNavigation();


    const dadosRecebidos = navigation?.extras.state

    if (dadosRecebidos !== undefined) {

      const valuesObjRecebido = dadosRecebidos ? <Item[]>Object.values(dadosRecebidos) : <Item[]>[]

      console.log('construtor values', valuesObjRecebido)

      const coluna = Object.keys(valuesObjRecebido[0]).length

      this.listaDisciplinas = incluirKeyAtArray({ arrayObj: valuesObjRecebido, newkey: 'professor', coluna: coluna })
      this.listaDisciplinas.forEach((disc) => (disc['professor'] = 'None'))
      this.keys = Object.keys(this.listaDisciplinas[0])


      console.log('construtor dadosRecebidos', dadosRecebidos)
    }

  }

  ngOnInit(): void {


    // this.keys = computed(()=> Object.keys(this.listaDisciplinas[0]))
    console.log('proferrores', this.createListProfessores(professores_test, 50))

  }

  salvar = () => {

    this.dados.setdataStore(this.listaDisciplinas)
  }

  pegarDados = () => {
    const objrecebido = this.dados.getdataStore()
    console.log(objrecebido)

    return objrecebido

  }

  createListProfessores(names: string[], n: number) {
    let result: string[] = [];
    for (let i = 0; i < n; i++) {
      let randomIndex = getRandomInt(0, names.length - 1);
      result.push(names[randomIndex]);
    }
    return result;
  }

  preencher() {
    const prof = this.createListProfessores(professores_test, this.listaDisciplinas.length)

    this.listaDisciplinas.forEach((disc: Item, k: number) => disc['professor'] = prof[k])
    console.log("Preenchendo professores automaticamente", this.listaDisciplinas)

  }


}
