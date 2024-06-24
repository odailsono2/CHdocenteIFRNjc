import { AfterRenderPhase, AfterRenderRef, AfterViewInit, Component, ElementRef, OnInit, viewChild, viewChildren } from '@angular/core';
import { Utils } from '../services/functions.service';
import { Test2Component } from '../test2/test2.component';
import { DisciplinasInterface, disciplina1, todasDisciplinas } from '../intefaces/InterfaceDisciplina';
import { TableJSONComponent } from '../tabela-from-json/tabela-from-json.component';
import { Item } from '../services/tableFunctions';

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [Test2Component, TableJSONComponent],
  template: `
    <app-test2 [()]="duasvias" (customEvent)="handleEvent($event)"></app-test2>
    @for (key of chaves; track $index){
      <div>{{key}}</div>
    }
    <div>{{chaves}}</div>
    <!-- <app-tableJson [(obJSON)]="disciplinas"></app-tableJson> -->

  `,
  styleUrl: './test.component.css'
})
export class TestComponent implements OnInit {

  eventType: string = '';

  duasvias: string = 'aaa'

  disciplina = disciplina1

  chaves = Object.keys(this.disciplina)


  divcontent = viewChildren<ElementRef>('editavelDiv')
  properties: any[] = []
  disciplinas: Item[] = todasDisciplinas;

  constructor() {
    // console.log(Object.getOwnPropertyNames(this))
    // const divs = this.divcontent()
    // divs[0].nativeElement.innerText = 'Ola'

    //  const a = Reflect.getPrototypeOf(divs[0].nativeElement)
    console.log(this.disciplinas)
    console.log(this.chaves)
  }



  ngOnInit() {

    // const divs = this.divcontent()
    // divs[0].nativeElement.innerText = 'Ola'
    // const a = Object.entries(divs)
    // console.log(a)

    // a.forEach((item:any)=>{
    //   this.properties.push(item)
    // })



  }


  handleEvent(event: Event) {
    console.log('Event emitted:', event.type);
  }

  changeEventType(newEventType: string) {
    this.eventType = newEventType;
  }




}
