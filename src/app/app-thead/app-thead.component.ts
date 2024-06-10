import { Component, ElementRef, Input, QueryList, Renderer2, ViewChild, ViewChildren } from '@angular/core';
import { todasDisciplinas } from '../intefaces/InterfaceDisciplina';
import { TableThins } from '../services/functions.service';
import { Item, filtrarMultiplasColunasTabela } from '../services/ordenarobjetos';
@Component({
  selector: 'app-app-thead',
  standalone: true,
  imports: [],
  templateUrl: './app-thead.component.html',
  styleUrl: './app-thead.component.css'
})
export class AppTHeadComponent {

  @ViewChildren('tdRef') tds!: QueryList<ElementRef>;

  @Input() listaObjetosOriginal:Item[] = todasDisciplinas

  listaKeysPesquisa:Map<string,string>

  listaObjetos = this.listaObjetosOriginal
  /*const teste:any[] = [{
    "periodo": "6",
    "componente": "1813 - Sistemas de Energia Eólica(60H)",
    "tipo": "Regular",
    "optativo": "Não",
    "chTeorica": "60",
    "area": "{ items, key, findItem }: { items: Item[]; key: string; findItem: string; }, key: string, palavra: stringodo": "6",
    "componente": "1814 - Sistemas de Geração Hidrelétricos(60H)",
    "tipo": "Regular",
    "optativo": "Não",
    "chTeorica": "60",
    "area": "Energias Renováveis",
    "curso": "CST Energias Renovaveis"
}]
//*/
  listKeys:string[]=[]
  
  constructor(public tableThings: TableThins, private renderer:Renderer2){
    this.listaKeysPesquisa = new Map<string,string>()
    this.listaObjetos = this.tableThings.appendIDJSON(this.listaObjetosOriginal)
    this.listaObjetosOriginal = this.listaObjetos
    this.listKeys = this.tableThings.getKeys(this.listaObjetos[0])
    this.listKeys.forEach((key)=>this.listaKeysPesquisa.set(key,''))

  }

  trackById(index: number, item: any): number {
    return item.id;
  }

  //buscar elemento em uma lista de objetos na chave especificada
  buscarTexto = (items:Item[],texto:string, key:string):Item[]=>{
    const palavra = texto.toLowerCase()
    const novalista = this.tableThings.buscarItem({items,findItem:palavra,key:key})
    return novalista
  }

  
  //filtra simultaneamento em várias colunas de uma tabela
  filtrar = (key:string, evento:any)=>{

    let resultado:Item[] = this.listaObjetosOriginal
    
    const palavra:string = evento.target.value.toLowerCase()

    // Map para armazenar os itens pesquisados no filtros individuais
    // de cada coluna
    this.listaKeysPesquisa.set(key,palavra)

    
    resultado = this.tableThings.filtrarMultiplasColunasTabela(
      { 
        items:resultado,
        key:key,
        mapKeysPalavras:this.listaKeysPesquisa,
        palavra:palavra
      })
    
 
    this.listaObjetos = resultado
  }

  aClickUP = (chave:string)=>this.tableThings.ordenarAD(this.listaObjetos,chave)
  aClickDOWN = (chave:string)=>this.tableThings.ordenarAD(this.listaObjetos,chave, false)

}


function Inputs(target: AppTHeadComponent, propertyKey: 'objeto'): void {
  throw new Error('Function not implemented.');
}

