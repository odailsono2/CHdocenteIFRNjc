import { Component, ElementRef, OnChanges, OnInit, SimpleChanges, computed, inject, input, model, output, signal, viewChildren } from '@angular/core';
import { todasDisciplinas } from '../intefaces/InterfaceDisciplina';
import { Utils } from '../services/functions.service';
import { Item, ObjKey } from '../services/tableFunctions';
import { OrdenarComponent } from '../OrdenarComponent/ordenar.component';
import { FiltroListaComponent } from '../filtro-lista/filtro-lista.component';
import { DataServices } from '../services/DataServices.service';
import { Route } from '@angular/router';
import { id } from 'date-fns/locale';
import { delay } from 'rxjs';
@Component({
  selector: 'app-tableJson',
  standalone: true,
  imports: [OrdenarComponent, FiltroListaComponent],
  templateUrl: './tabela-from-json.component.html',
  styleUrl: './tabela-from-json.component.css'
})
export class TableJSONComponent implements OnInit, OnChanges {


  // @Input() obJSON : Item[] = todasDisciplinas

  // obJSONChange = model<Item[]>()

  // data = inject(DataServices)

  obJSON = model<Item[]>([])

  listaObjetosOriginal: Item[] = []//= this.obJSON

  divcontent = viewChildren<ElementRef>('editavelDiv')

  listaKeysPesquisa: Map<string, string> = {} as Map<string, string>

  listaObjetos = signal<Item[]>([])

  listaObjetosAnterior: Item[] = []

  listKeys: ObjKey[] = []

  listKeysOriginal = signal<ObjKey[]>([])

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


  ngOnChanges(changes: SimpleChanges): void {
    if (changes['obJSON'] && changes['obJSON'].firstChange) {
      const atual = changes['obJSON'].currentValue as Item[]
      const antigo = changes['obJSON'].previousValue as Item[]

      if (atual && antigo) {
        const igual = atual.every((at, index) => at === antigo[index])

        if (!igual) {

          this.listaObjetosOriginal = this.obJSON()
          console.log("checagem: ", this.listaObjetosOriginal)
          console.log("keys ", Object.keys(this.obJSON()))
          this.listaKeysPesquisa = new Map<string, string>()

          const keyID = Object.keys(this.obJSON()).find((key) => (key === 'id'))
          if (keyID === undefined) {
            console.log('sem keyID')
            const auxlistaObj: Item[] = this.tableThings.incluirKeyAtArray({
              arrayObj: this.listaObjetosOriginal,
              newkey: 'id',
              coluna: 0,
              // value:''
            })
            // this.listaObjetos.update(()=>this.obJSON().map((obj) => ({ ...obj })))

            this.listaObjetos.set(auxlistaObj)
          } else {

            this.listaObjetos.set(this.listaObjetosOriginal)
          }

          // estado dos objetos anterior inicializado
          this.listaObjetosAnterior = this.listaObjetos().map((obj) => ({ ...obj }))

          //lista de objetos no estado inicial
          this.listaObjetosOriginal = this.listaObjetos()
        }
      }
    }
  }

  getIDobjeto(index: number) {

    const keys = Object.keys(this.obJSON())

    return keys[index]

  }



  ngDoCheck() {

    const antigo = this.listaObjetosOriginal
    const atual = this.obJSON()

    const igual = atual.every((at, index) => at === atual[index])
    if (atual && antigo) {
      const igual = atual.every((at, index) => at === antigo[index])

      if (!igual) {


        this.listaObjetosOriginal = this.obJSON()
        console.log("checagem: ", this.listaObjetosOriginal)
        console.log("keys ", Object.keys(this.obJSON()))
        this.listaKeysPesquisa = new Map<string, string>()

        const keyID = Object.keys(this.obJSON()).find((key) => (key === 'id'))
        if (keyID === undefined) {
          console.log('sem keyID')
          const auxlistaObj: Item[] = this.tableThings.incluirKeyAtArray({
            arrayObj: this.listaObjetosOriginal,
            newkey: 'id',
            coluna: 0,
            // value:''
          })
          // this.listaObjetos.update(()=>this.obJSON().map((obj) => ({ ...obj })))

          this.listaObjetos.set(auxlistaObj)
        } else {

          this.listaObjetos.set(this.listaObjetosOriginal)
        }

        // estado dos objetos anterior inicializado
        this.listaObjetosAnterior = this.listaObjetos().map((obj) => ({ ...obj }))

        //lista de objetos no estado inicial
        this.listaObjetosOriginal = this.listaObjetos()

        // this.obJSON.set(this.listaObjetos())
      }
    }
  }



  ngOnInit(): void {


    this.inicializaçãoVariáveis()
  }

  retornaValorInicialdasVariaveis() {
    this.listaObjetosOriginal = []


    this.listaKeysPesquisa = {} as Map<string, string>

    this.listaObjetos = signal<Item[]>([])

    this.listaObjetosAnterior = []

    this.listKeys = []

    this.listKeysOriginal = signal<ObjKey[]>([])

    this.listKeysObjInicial = [];

    this.listKeysHidden = []

  }
  inicializaçãoVariáveis() {

    // console.log("type of", typeof this.listaObjetosOriginal)


    this.listaObjetosOriginal = this.obJSON()
    console.log("inicialização: ", this.obJSON())
    this.listaKeysPesquisa = new Map<string, string>()

    const keyID = this.listKeysOriginal().find((key) => (key.name === 'id'))
    if (keyID === undefined) {
      const auxlistaObj: Item[] = this.tableThings.incluirKeyAtArray({
        arrayObj: this.listaObjetosOriginal,
        newkey: 'id',
        coluna: 0,
        // value:''
      })

      this.listaObjetos.set(auxlistaObj)
    } else {
      this.listaObjetos.set(this.listaObjetosOriginal)
    }

    // estado dos objetos anterior inicializado
    this.listaObjetosAnterior = this.listaObjetos().map((obj) => ({ ...obj }))

    //lista de objetos no estado inicial
    this.listaObjetosOriginal = this.listaObjetos()


    this.tableThings.getKeys(this.listaObjetos()[0]).forEach((key) => this.listKeysOriginal().push({ name: key }))

    this.listKeysOriginal().forEach((key) => {
      this.listKeys.push({ 'name': key.name })
    })

    this.inicializaListaKeys()

    this.resetListaObjKeys()
    // this.listKeys.filter((key)=>key.name === 'professor')[0].visible='hidden'

    // this.listKeys = this.listKeys.filter((key)=>key.visible!='hidden')

    //coloca as chaves diposniveis em um Set que será usado nos filtros
    this.listKeys.forEach((key) => this.listaKeysPesquisa.set(key.name, ''))

    this.obJSONChange(this.listaObjetos())

    console.log("fim-inicialização: obj", this.listaObjetos())
    console.log("fim-inicialização: objInicial", this.listKeysObjInicial)
    console.log("fim-inicialização: objOriginal", this.listaObjetosOriginal)
    console.log("fim-inicialização: objAnterior", this.listaObjetosAnterior)


    console.log("fim-inicialização: ", this.listKeys)
    console.log("fim-inicialização: keysorig", this.listKeysOriginal())
    console.log("fim-inicialização: keysinicial", this.listKeysObjInicial)
    console.log("fim-inicialização: keusHidden", this.listKeysHidden)
    console.log("fim-inicialização: listaKeysPesquisa", this.listaKeysPesquisa)




    // this.data.setdataStore(this.listaObjetos())
  }

  obJSONChange(value: Item[]) {
    console.log("obJSONChange(value): ", value)
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
      if (key.name.indexOf('_') === -1) {
        this.listKeysObjInicial.push({ name: key.name })
      }
    })

    this.listKeys = this.listKeysObjInicial
  }

  resetListaObjKeys() {

    // this.listKeys.filter((key)=>key.name === 'professor')[0].visible='hidden'

    this.listKeys = this.listKeysObjInicial.filter((key) => (key.visible != 'hidden' || key.name.charAt(0) === '_'))
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
    a.contentEditable = true
    a.focus()
  }

  //filtra simultaneamento em várias colunas de uma tabela
  filtrar = (key: string, evento: any) => {

    let resultado: Item[] = this.listaObjetosOriginal

    const palavra: string = evento.target.value.toLowerCase()

    // Map para armazenar os itens pesquisados no filtros individuais
    // de cada coluna
    this.listaKeysPesquisa.set(key, palavra)

    console.log("filtrar:", palavra, key, resultado, this.listaKeysPesquisa)

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


      // const a = this.divcontent()[divID].nativeElement

      const a = this.divcontent().filter((div) => div.nativeElement.id === divID)[0].nativeElement

      this.movecursor(key, divID);

      event.preventDefault()

      if (key === 'Enter' || key === 'Escape') {
        a.blur()
        // this.divcontent().forEach((div)=>console.log(div.nativeElement))
        // a.focus()
        // const a = this.divcontent().filter((div)=>(div.nativeElement.id === idDIV))
        // console.log(idDIV)
        // console.log(a[0].nativeElement.id)
        // a[0].nativeElement.blur()


      }

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

      this.listaObjetos()[id]['_change'] = true

      // this.listaObjetos()[id] = this.setObjChange(this.listaObjetos()[id], key)
      // this.listaObjetosAnterior[id] = this.setObjChange(this.listaObjetosAnterior[id], key)

      this.obJSONChange(this.listaObjetos())


      // this.data.setdataStore(this.listaObjetos())
    }

  }

  onKeyDown = this.onInput

  private movecursor(key: string, divID: string) {

    if (key === 'ArrowDown') {

      const whereisdots = Number(divID.indexOf(':'));

      const y = Number(divID.slice(0, whereisdots));

      const yID = y == this.obJSON().length - 1 ? this.obJSON().length - 1 : y + 1;

      const newId = yID + ':' + divID.slice(whereisdots + 1); // id da celula de baixo

      console.log("id", y, newId, whereisdots, divID.slice(whereisdots + 1));

      const b = this.divcontent().filter((div) => div.nativeElement.id === newId)[0].nativeElement; // as HTMLDivElement

      b.click();
      // a.blur()
      console.log(b);

    }
    if (key === 'ArrowUp') {

      const whereisdots = Number(divID.indexOf(':'));

      const y = Number(divID.slice(0, whereisdots));

      const yID = y === 0 ? 0 : y - 1;

      const newId = yID + ':' + divID.slice(whereisdots + 1); // id da celula de baixo

      console.log("id", y, newId, whereisdots, divID.slice(whereisdots + 1));

      const b = this.divcontent().filter((div) => div.nativeElement.id === newId)[0].nativeElement; // as HTMLDivElement

      b.click();
      // a.blur()
      console.log(b);

    }

    if (key === 'ArrowLeft') {
      const whereisdots = Number(divID.indexOf(':'));

      const colunaName = divID.slice(whereisdots + 1)

      const y = Number(divID.slice(0, whereisdots));

      const indexColuna = this.listKeys.findIndex((ch) => ch.name === colunaName)

      const xID = indexColuna == 0 ? 0 : indexColuna - 1



      const newId = y + ':' + this.listKeys.at(xID)?.name; // id da celula de baixo

      console.log("id", y, newId, whereisdots, divID.slice(whereisdots + 1));

      const b = this.divcontent().filter((div) => div.nativeElement.id === newId)[0].nativeElement; // as HTMLDivElement

      b.click();
      // a.blur()
      console.log(b);

    }

    if (key === 'ArrowRight') {
      const whereisdots = Number(divID.indexOf(':'));

      const colunaName = divID.slice(whereisdots + 1)

      const y = Number(divID.slice(0, whereisdots));

      const indexColuna = this.listKeys.findIndex((ch) => ch.name === colunaName)

      const xID = indexColuna == this.listKeys.length - 1 ? this.listKeys.length - 1 : indexColuna + 1



      const newId = y + ':' + this.listKeys.at(xID)?.name; // id da celula de baixo

      console.log("id", y, newId, whereisdots, divID.slice(whereisdots + 1));

      const b = this.divcontent().filter((div) => div.nativeElement.id === newId)[0].nativeElement; // as HTMLDivElement

      b.click();
      // a.blur()
      console.log(b);

    }

  }

  // setObjChange = (obj: Item, key: string) => this.updateObj(obj, '_change', key)

  updateObj(obj: Item, key: string, value: any): Item {
    obj[key] = value

    return obj
  }

  getGridTemplateColumns(): string {
    const colunas = this.listKeys.length
    return `repeat(${colunas}, auto)`;
  }

  createIDsTable(index: number, item: Item) {
    return item['id'] + ":" + item['componente']
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


