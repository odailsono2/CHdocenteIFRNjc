import { AfterViewInit, Component, OnInit, Signal, computed, inject, signal } from '@angular/core';
import { Item, incluirKeyAtArray } from '../services/tableFunctions';
import { TableJSONComponent } from '../tabela-from-json/tabela-from-json.component';
import { Router } from '@angular/router';
import { DataServices } from '../services/DataServices.service';

@Component({
  selector: 'app-listar-disciplinas',
  standalone: true,
  imports: [TableJSONComponent],
  templateUrl: './listar-disciplinas.component.html',
  styleUrl: './listar-disciplinas.component.css'
})
export class ListarDisciplinasComponent  {

  listaDisciplinas: Item[] = []
  // keys: Signal<string[]> | undefined 
  keys:string[] = []
  // dadosRecebidos: any[] =[]

  router = inject(Router)

  dados = inject(DataServices)

  //  chaves = computed(()=>Object.keys(this.listaDisciplinas[0]))



  constructor() {
    const navigation = this.router.getCurrentNavigation();


    const dadosRecebidos = navigation?.extras.state

    const valuesObjRecebido = dadosRecebidos ? <Item[]>Object.values(dadosRecebidos) : <Item[]>[]

    console.log('construtor values', valuesObjRecebido)

    const coluna = Object.keys(valuesObjRecebido[0]).length

    this.listaDisciplinas = incluirKeyAtArray({ arrayObj: valuesObjRecebido, newkey: 'professor', coluna: coluna })
    this.listaDisciplinas.forEach((disc)=>(disc['professor']='None'))
    this.keys = Object.keys(this.listaDisciplinas[0])
    

    console.log('construtor dadosRecebidos', dadosRecebidos)


  }

  ngOnInit(): void {
    

    // this.keys = computed(()=> Object.keys(this.listaDisciplinas[0]))
      
  }

  salvar = ()=>{this.dados.setdataStore(this.listaDisciplinas)}

  pegarDados = ()=>{
    const objrecebido  = this.dados.getdataStore()
    console.log(objrecebido)

    return objrecebido
    
  }


}
