import { Component, ElementRef, Input, Renderer2, viewChildren } from '@angular/core';
import { todasDisciplinas } from '../../intefaces/InterfaceDisciplina';
import { TableThins } from '../../services/functions.service';
import { Item } from '../../services/tableFunctions';
import { OrdenarComponent } from '../../OrdenarComponent/ordenar.component';
import { FiltroListaComponent } from '../../filtro-lista/filtro-lista.component';
@Component({
  selector: 'app-table',
  standalone: true,
  imports: [OrdenarComponent, FiltroListaComponent],
  templateUrl: './TableComponent.component.html',
  styleUrl: './TableComponent.componet.css'
})
export class TableComponent {


  @Input() listaObjetosOriginal:Item[] = [... todasDisciplinas]
  
  divcontent = viewChildren<ElementRef>('editavelDiv')

  listaKeysPesquisa:Map<string,string>

  listaObjetos = this.listaObjetosOriginal

  listaObjetosAnterior:Item[]

  auxContent:string = ""

  listKeys:string[]=[]

  listKeysOriginal:string[]=[]

  constructor(public tableThings: TableThins){
    this.listaKeysPesquisa = new Map<string,string>()
    this.listaObjetos = this.tableThings.incluirKeyAtArray({
      arrayObj : this.listaObjetosOriginal,
      newkey: 'id',
      coluna:0,
      // value:''
    })
    this.listaObjetos = this.tableThings.incluirKeyAtArray({
      arrayObj : this.listaObjetos,
      newkey: '_change',
      coluna:3,
      value:''
    })
    this.listaObjetosAnterior = this.listaObjetos.map((obj)=>({... obj}))
    this.listaObjetosOriginal = this.listaObjetos
    this.listKeysOriginal = this.tableThings.getKeys(this.listaObjetos[0])
    this.listKeys = this.listKeysOriginal.filter((key:string)=>(!key.includes('_')))
    this.listKeys.forEach((key)=>this.listaKeysPesquisa.set(key,''))
    // console.log(this.listaObjetos[0]['componente'].length)
    // console.log(this.listaObjetosAnterior[0]['componente'].length)
    // console.log(this.listaObjetos[0]['componente']===this.listaObjetosAnterior[0]['componente'])

  }


 
  //filtra simultaneamento em várias colunas de uma tabela
  filtrar = (key:string, evento:any, listaOriginal:Item[])=>{
    
    let resultado:Item[] = listaOriginal
    
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

  onInput = (event:KeyboardEvent,idDIV:number) => {
    
    
    const key = (event as KeyboardEvent).key

    // console.log(key)

    const teclas = ['Enter','ArrowUp','ArrowDown','ArrowLeft','ArrowRight', 'Escape']

    if(teclas.includes(key))

      {
        event.preventDefault()

        const a = this.divcontent()[idDIV].nativeElement
        
        a.blur()
        // this.divcontent().forEach((div)=>console.log(div.nativeElement))
        // a.focus()
        // const a = this.divcontent().filter((div)=>(div.nativeElement.id === idDIV))
        // console.log(idDIV)
        // console.log(a[0].nativeElement.id)
        // a[0].nativeElement.blur()
        
        

        
      }
  }

  onBlur = (event:any,id:number,key:string, divID:number) => {


    
    const auxContent:any = event.target.innerText;

    // console.log('listaObj',this.listaObjetos[id][key].length)
    // console.log('listaObjante',this.listaObjetosAnterior[id][key].length)

    // console.log(this.tableThings.normalizeString(this.listaObjetos[id][key])===this.tableThings.normalizeString(auxContent))
  
    if ( this.tableThings.normalizeString(this.listaObjetos[id][key]) !==this.tableThings.normalizeString(auxContent)){

      // const a = this.divcontent()[divID].nativeElement
      // a.style.backgroundColor = 'lightcoral';

      if (typeof this.listaObjetos[id][key] === 'number'){
        this.listaObjetos[id][key] = Number(auxContent)
        this.listaObjetosAnterior[id][key] = Number(auxContent)
      }else{
        this.listaObjetos[id][key] = auxContent
        this.listaObjetosAnterior[id][key] = auxContent
      }

      this.listaObjetos[id]=this.setObjChange(this.listaObjetos[id], key)
      this.listaObjetosAnterior[id]=this.setObjChange(this.listaObjetosAnterior[id],key)
   }
     
  }

  onKeyDown = this.onInput
  
  setObjChange = (obj:Item, key:string)=>this.updateObj(obj,'_change',key)

  updateObj(obj:Item, key:string, value:any):Item{
    obj[key] = value

    return obj
  }

  getGridTemplateColumns(): string {
    return `repeat(${this.listKeys.length}, 1fr)`;
  }

  moveLeft(){
    this.listKeys.length

  }
  moveRight(){}
  
  aClickUP = (chave:string)=>this.tableThings.ordenarAD(this.listaObjetos,chave)
  aClickDOWN = (chave:string)=>this.tableThings.ordenarAD(this.listaObjetos,chave, false)

}


