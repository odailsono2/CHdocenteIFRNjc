export interface Item {
  [key: string]: any; // This allows the object to have properties of any type
}

export interface ObjKey {
  name: string,
  visible: boolean
}

export function setObjKey({ name }: { name: string }): ObjKey {
  let newKey: ObjKey = {} as ObjKey;

  newKey.name = name
  newKey.visible = true

  return newKey
}

export function setListObjKeys({ listaKeysNames }: { listaKeysNames: string[] }): ObjKey[] {
  const listaKeys: ObjKey[] = []
  listaKeysNames.forEach((name) => {
    listaKeys.push(setObjKey({ name: name }))
  })

  return listaKeys
}

/**
 * Sorts an array of objects by a specified key.
 * 
 * @param items - The array of objects to be sorted.
 * @param key - The key (property) to sort the objects by.
 * @param ascending - Optional parameter to specify ascending or descending order. Default is true (ascending).
 * @returns The sorted array of objects.
 */
export function sortByParameter(items: Item[], key: string, ascending: boolean = true): Item[] {
  return items.sort((a, b) => {
    if (a[key] < b[key]) {
      return ascending ? -1 : 1;
    } else if (a[key] > b[key]) {
      return ascending ? 1 : -1;
    } else {
      return 0;
    }
  });
}

interface BuscaObejeto {
  items: Item[];
  key: string;
  findItem: string | undefined;
}

export function buscaObjeto({ items, key, findItem }: BuscaObejeto): Item[] {
  const resultado: Item[] = items.filter((item) => (item[key].toLowerCase().includes(findItem)))
  return resultado
}

interface FiltroTabela {
  items: Item[],
  key: string,
  palavra: string,
  mapKeysPalavras: Map<string, string>
}
export function filtrarMultiplasColunasTabela({ items, key, palavra, mapKeysPalavras }: FiltroTabela): Item[] {
  // Map para armazenar os itens pesquisados no filtros individuais
  // de cada coluna
  let resultado = items
  mapKeysPalavras.set(key, palavra)

  mapKeysPalavras.forEach((value, key) => {
    if (value === '') {
      return
    }
    else {
      resultado = buscaObjeto({ items: resultado, findItem: value, key: key })
    }
  })

  return resultado
}

interface novoMembroObjeto {
  obj: Item,
  newkey: any,
  value?: any,
  indice?: number
  visible?: boolean
}
export function incluirKeyAt({ obj, newkey, value = undefined, indice = 0 }: novoMembroObjeto): Item {
  const entries = Object.entries(obj)
  entries.splice(indice, 0, [newkey, value])
  return Object.fromEntries(entries)
}

interface novoMembroArrayObjetos {
  arrayObj: Item[],
  newkey: any,
  value?: any,
  indice?: number
}

export function incluirKeyAtArray({ arrayObj, newkey, value = undefined, indice = 0 }: novoMembroArrayObjetos): any {
  let nova_lista: any[] = []

  if (value === undefined && indice === 0) {

    arrayObj.forEach((objeto: any, id: number) => {
      // console.log(nova_lista)
      const novo_objeto = incluirKeyAt({ newkey: newkey, obj: objeto, indice: indice, value: id })//{id,...objeto}
      nova_lista.push(novo_objeto)
      // console.log(nova_lista)

    });

    return nova_lista
  }


  arrayObj.forEach((objeto: any) => {
    const novo_objeto = incluirKeyAt({ newkey: newkey, obj: objeto, indice: indice, value: value })//{id,...objeto}
    nova_lista.push(novo_objeto)
  });

  return nova_lista

}

//----Functions for objects



