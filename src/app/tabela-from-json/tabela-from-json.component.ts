import { Component, ElementRef, Input, Signal, computed, signal, viewChildren } from '@angular/core';
import { todasDisciplinas } from '../intefaces/InterfaceDisciplina';
import { TableThins } from '../services/functions.service';
import { Item, ObjKey } from '../services/tableFunctions';
import { OrdenarComponent } from '../OrdenarComponent/ordenar.component';
import { FiltroListaComponent } from '../filtro-lista/filtro-lista.component';
@Component({
  selector: 'app-tableJson',
  standalone: true,
  imports: [OrdenarComponent, FiltroListaComponent],
  templateUrl: './tabela-from-json.component.html',
  styleUrl: './tabela-from-json.component.css'
})
export class TableJSONComponent {


  @Input() listaObjetosOriginal: Item[] = [...todasDisciplinas]

  divcontent = viewChildren<ElementRef>('editavelDiv')

  listaKeysPesquisa: Map<string, string>

  listaObjetos = signal(this.listaObjetosOriginal)

  listaObjetosAnterior: Item[]

  auxContent: string = ""

  listKeys: ObjKey[] = []

  listKeysOriginal: Signal<string[]>
  listKeysObjInicial: ObjKey[] = [];

  listKeysHidden: ObjKey[] = []

  constructor(public tableThings: TableThins) {

    this.listaKeysPesquisa = new Map<string, string>()

    //----acrescenta chaves de controle

    // coluna ID acrescentada

    this.listaObjetos.set(this.tableThings.incluirKeyAtArray({
      arrayObj: this.listaObjetos(),
      newkey: 'id',
      coluna: 0,
      // value:''
    }))

    // coluna professor acrescentada

    this.listaObjetos.set(this.tableThings.incluirKeyAtArray({
      arrayObj: this.listaObjetos(),
      newkey: 'professor',
      coluna: this.listaObjetos().length,
      value: ''
    }))

    // estado dos objetos anterior inicializado
    this.listaObjetosAnterior = this.listaObjetos().map((obj) => ({ ...obj }))

    //lista de objetos no estado inicial
    this.listaObjetosOriginal = this.listaObjetos()

    this.listKeysOriginal = computed(() => this.tableThings.getKeys(this.listaObjetos()[0]))

    // this.listKeysOriginal().forEach((key)=>{
    //   this.listKeys.push({'name':key})
    // })

    this.inicializaListaKeys()

    this.resetListaObjKeys()
    // this.listKeys.filter((key)=>key.name === 'professor')[0].visible='hidden'

    // this.listKeys = this.listKeys.filter((key)=>key.visible!='hidden')

    //coloca as chaves diposniveis em um Set que será usado nos filtros
    this.listKeys.forEach((key) => this.listaKeysPesquisa.set(key.name, ''))
    // console.log(this.listaObjetos[0]['componente'].length)
    // console.log(this.listaObjetosAnterior[0]['componente'].length)
    // console.log(this.listaObjetos()[0]['componente']===this.listaObjetosAnterior[0]['componente'])

  }

  setValuesObjKeys = (obgkeyname: string, key: any, value: any): void => {
    const objkey = this.listKeys.find((obj) => obj.name === obgkeyname)
    if (objkey === undefined) {
      alert("objeto não encontrado!")
    }
    else {
      this.tableThings.setParameterObjKey(objkey, key, value)
    }
  }

  setChangeCel(obgkeyname:string){
    this.setValuesObjKeys(obgkeyname,'change',true)
  }


  inicializaListaKeys() {

    // this.listKeys = []

    this.listKeysOriginal().forEach((key) => {
      this.listKeysObjInicial.push({ 'name': key })
    })

    this.listKeys = this.listKeysObjInicial
  }

  resetListaObjKeys() {

    // this.listKeys.filter((key)=>key.name === 'professor')[0].visible='hidden'

    this.listKeys = this.listKeysObjInicial.filter((key) => key.visible != 'hidden')
    this.listKeysHidden = this.listKeysObjInicial.filter((key) => key.visible === 'hidden')

  }

  hideColuna(keyTarget: string) {
    this.listKeys.filter((key) => key.name === keyTarget)[0].visible = 'hidden'
    this.resetListaObjKeys()


  }

  exibirColuna(keyTarget: string) {
    this.listKeysHidden.filter((key) => key.name === keyTarget)[0].visible = ''
    this.listKeys = [... this.listKeysHidden]
    this.resetListaObjKeys()


  }

  setEditableColuna(divID: number, keyeditable: boolean | undefined) {
    const a = this.divcontent()[divID].nativeElement
    a.contentEditable = keyeditable ? true : false
    a.focus()
    // console.log(a)
  }

  //filtra simultaneamento em várias colunas de uma tabela
  filtrar = (key: string, evento: any, listaOriginal: Item[]) => {

    let resultado: Item[] = listaOriginal

    const palavra: string = evento.target.value.toLowerCase()

    // Map para armazenar os itens pesquisados no filtros individuais
    // de cada coluna
    this.listaKeysPesquisa.set(key, palavra)


    resultado = this.tableThings.filtrarMultiplasColunasTabela(
      {
        items: resultado,
        key: key,
        mapKeysPalavras: this.listaKeysPesquisa,
        palavra: palavra
      })


    this.listaObjetos.set(resultado)
  }

  onInput = (event: KeyboardEvent, idDIV: number) => {


    const key = (event as KeyboardEvent).key

    // console.log(key)

    const teclas = ['Enter', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Escape']

    if (teclas.includes(key)) {
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

  onBlur = (event: any, id: number, key: string, divID: number) => {



    const auxContent: any = event.target.innerText;

    // console.log('listaObj',this.listaObjetos[id][key].length)
    // console.log('listaObjante',this.listaObjetosAnterior[id][key].length)

    // console.log(this.tableThings.normalizeString(this.listaObjetos[id][key])===this.tableThings.normalizeString(auxContent))

    if (this.tableThings.normalizeString(this.listaObjetos()[id][key]) !== this.tableThings.normalizeString(auxContent)) {

      const a = this.divcontent()[divID].nativeElement
      a.style.backgroundColor = 'lightcoral';

      if (typeof this.listaObjetos()[id][key] === 'number') {
        this.listaObjetos()[id][key] = Number(auxContent)
        this.listaObjetosAnterior[id][key] = Number(auxContent)
      } else {
        this.listaObjetos()[id][key] = auxContent
        this.listaObjetosAnterior[id][key] = auxContent
      }

      this.listaObjetos()[id] = this.setObjChange(this.listaObjetos()[id], key)
      this.listaObjetosAnterior[id] = this.setObjChange(this.listaObjetosAnterior[id], key)
    }

  }

  onKeyDown = this.onInput

  setObjChange = (obj: Item, key: string) => this.updateObj(obj, '_change', key)

  updateObj(obj: Item, key: string, value: any): Item {
    obj[key] = value

    return obj
  }

  getGridTemplateColumns(): string {
    const colunas = this.listKeys.length
    return `repeat(${colunas}, auto)`;
  }

  moveLeft(keyTarget: string) {
    //---
  }
  moveRight(keyTarget: string) {
    // implementar
  }

  aClickUP = (chave: string) => this.tableThings.ordenarAD(this.listaObjetos(), chave)
  aClickDOWN = (chave: string) => this.tableThings.ordenarAD(this.listaObjetos(), chave, false)

}


