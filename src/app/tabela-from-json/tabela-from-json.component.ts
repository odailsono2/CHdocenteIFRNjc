import { Component, ElementRef, Input, OnInit, Signal, computed, inject, input, model, output, signal, viewChildren } from '@angular/core';
import { todasDisciplinas } from '../intefaces/InterfaceDisciplina';
import { Utils } from '../services/functions.service';
import { Item, ObjKey } from '../services/tableFunctions';
import { OrdenarComponent } from '../OrdenarComponent/ordenar.component';
import { FiltroListaComponent } from '../filtro-lista/filtro-lista.component';
import { DataServices } from '../services/DataServices.service';
import { Route } from '@angular/router';
@Component({
  selector: 'app-tableJson',
  standalone: true,
  imports: [OrdenarComponent, FiltroListaComponent],
  templateUrl: './tabela-from-json.component.html',
  styleUrl: './tabela-from-json.component.css'
})
export class TableJSONComponent implements OnInit {


  // @Input() obJSON : Item[] = todasDisciplinas

  // obJSONChange = model<Item[]>()

  // data = inject(DataServices)

  obJSON = model<Item[]>(todasDisciplinas)

  listaObjetosOriginal: Item[] = []//= this.obJSON

  divcontent = viewChildren<ElementRef>('editavelDiv')

  listaKeysPesquisa: Map<string, string> = {} as Map<string, string>

  listaObjetos = signal<Item[]>([])

  listaObjetosAnterior: Item[] = []

  listKeys: ObjKey[] = []

  listKeysOriginal = signal<string[]>([])

  listKeysObjInicial: ObjKey[] = [];

  listKeysHidden: ObjKey[] = []

  constructor(public tableThings: Utils) {

    // if (this.data.getdataStoreJSON() !== undefined){
    //   console.log("constructor: defined", this.data)
    //   // this.listaObjetosOriginal = JSON.parse(this.data.getfilesLoaded())
    //   this.listaObjetosOriginal = this.data.getdataStoreJSON()
    // }else{
    //   console.log("constructor: undefined", this.data.getdataStoreJSON())
    // }

    // this.listaObjetosOriginal.forEach((item)=>console.log("constructor: listaOriginal",item))
    // this.listaObjetosOriginal = this.obJSON()

  }

  ngOnInit(): void {
    

    console.log("ngOnINIT: ", this.obJSON())
    // console.log("type of", typeof this.listaObjetosOriginal)

    // if (this.obJSON() === undefined) {
    //   // this.listaObjetosOriginal = JSON.parse(this.data.getfilesLoaded())
    //   console.log(": defined", this.data)
    //   this.listaObjetosOriginal = this.data.getdataStoreJSON() === undefined ? [] : this.data.getdataStoreJSON()
    // }
    // else{
      this.listaObjetosOriginal = this.obJSON()
    // }


    this.listaKeysPesquisa = new Map<string, string>()

    // this.listaObjetosOriginal().forEach((item)=>this.listaObjetos().push(item))


    const auxlistaObj: Item[] = this.tableThings.incluirKeyAtArray({
      arrayObj: this.listaObjetosOriginal,
      newkey: 'id',
      coluna: 0,
      // value:''
    })

    this.listaObjetos.set(auxlistaObj)
    // auxlistaObj.forEach((item)=>{
    //   this.listaObjetos().push(item)
    // })


    // estado dos objetos anterior inicializado
    this.listaObjetosAnterior = this.listaObjetos().map((obj) => ({ ...obj }))

    //lista de objetos no estado inicial
    this.listaObjetosOriginal = this.listaObjetos()

    // this.listKeysOriginal = computed(() => this.tableThings.getKeys(this.listaObjetos()[0]))

    this.tableThings.getKeys(this.listaObjetos()[0]).forEach((key) => this.listKeysOriginal().push(key))

    // this.listKeysOriginal().forEach((key)=>{
    //   this.listKeys.push({'name':key})
    // })

    this.inicializaListaKeys()

    this.resetListaObjKeys()
    // this.listKeys.filter((key)=>key.name === 'professor')[0].visible='hidden'

    // this.listKeys = this.listKeys.filter((key)=>key.visible!='hidden')

    //coloca as chaves diposniveis em um Set que será usado nos filtros
    this.listKeys.forEach((key) => this.listaKeysPesquisa.set(key.name, ''))

    this.obJSONChange(this.listaObjetos())

    // this.data.setdataStore(this.listaObjetos())
  }

  obJSONChange(value: Item[]) {
    console.log("obJSONChange(value): ",value)
    this.obJSON.set(value)

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

  // setChangeCel(obgkeyname:string){
  //   this.setValuesObjKeys(obgkeyname,'change',true)
  // }


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

  setEditableColuna(divID: string, keyeditable: boolean | undefined) {
    const a = this.divcontent().filter((div) => div.nativeElement.id === divID)[0].nativeElement
    // console.log(a)
    a.contentEditable = keyeditable ? true : false
    a.focus()
  }

  //filtra simultaneamento em várias colunas de uma tabela
  filtrar = (key: string, evento: any) => {

    let resultado: Item[] = this.listaObjetosOriginal

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

  onInput = (event: KeyboardEvent, divID: string) => {


    const key = (event as KeyboardEvent).key

    // console.log(key)

    const teclas = ['Enter', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Escape']

    if (teclas.includes(key)) {
      event.preventDefault()

      // const a = this.divcontent()[divID].nativeElement

      const a = this.divcontent().filter((div) => div.nativeElement.id === divID)[0].nativeElement

      a.blur()
      // this.divcontent().forEach((div)=>console.log(div.nativeElement))
      // a.focus()
      // const a = this.divcontent().filter((div)=>(div.nativeElement.id === idDIV))
      // console.log(idDIV)
      // console.log(a[0].nativeElement.id)
      // a[0].nativeElement.blur()




    }
  }

  onBlur = (event: any, id: number, key: string, divID: string) => {



    const auxContent: any = event.target.innerText;

    // console.log('ID, KEY',id,key)
    // console.log('ListaObjeto',this.listaObjetosOriginal)
    // console.log('listaObjante',this.listaObjetosAnterior[id][key].length)

    // console.log(this.tableThings.normalizeString(this.listaObjetos()[id][key])===this.tableThings.normalizeString(auxContent))

    if (this.tableThings.normalizeString(this.listaObjetosOriginal[id][key]) !== this.tableThings.normalizeString(auxContent)) {

      //const a = this.divcontent()[divID].nativeElement
      const a = this.divcontent().filter((div) => div.nativeElement.id === divID)[0].nativeElement

      a.style.backgroundColor = 'lightcoral';

      if (typeof this.listaObjetos()[id][key] === 'number') {
        this.listaObjetos()[id][key] = Number(auxContent)
        this.listaObjetosAnterior[id][key] = Number(auxContent)
      } else {
        this.listaObjetos()[id][key] = auxContent
        this.listaObjetosAnterior[id][key] = auxContent
      }

      // this.listaObjetos()[id] = this.setObjChange(this.listaObjetos()[id], key)
      // this.listaObjetosAnterior[id] = this.setObjChange(this.listaObjetosAnterior[id], key)

      this.obJSONChange(this.listaObjetos())

      // this.data.setdataStore(this.listaObjetos())
    }

  }

  onKeyDown = this.onInput

  // setObjChange = (obj: Item, key: string) => this.updateObj(obj, '_change', key)

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


