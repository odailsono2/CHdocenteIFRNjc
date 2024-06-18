import { AfterRenderPhase, AfterRenderRef, AfterViewInit, Component, ElementRef, OnInit, viewChild, viewChildren } from '@angular/core';
import { TableThins } from '../services/functions.service';
import { Test2Component } from '../test2/test2.component';

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [Test2Component],
  template: `
    <app-test2 [(inputText)]="duasvias" (customEvent)="handleEvent($event)"></app-test2>
    <div>{{duasvias}}</div>
  `,
  styleUrl: './test.component.css'
})
export class TestComponent implements OnInit {

  eventType: string = '';

  duasvias:string = 'aaa'

  divcontent = viewChildren<ElementRef>('editavelDiv')
  properties: any[] =[]

  constructor() {
    // console.log(Object.getOwnPropertyNames(this))
    // const divs = this.divcontent()
    // divs[0].nativeElement.innerText = 'Ola'

    //  const a = Reflect.getPrototypeOf(divs[0].nativeElement)
    // // console.log(a)
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
