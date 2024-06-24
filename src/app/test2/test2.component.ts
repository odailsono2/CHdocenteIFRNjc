// import { Component, ElementRef, EventEmitter, Input, Output, Renderer2, SimpleChanges, input, model, output } from '@angular/core';

// @Component({
//   selector: 'app-test2',
//   standalone: true,
//   imports: [],
//   templateUrl: './test2.component.html',
//   styleUrl: './test2.component.css'
// })
// export class Test2Component { 
//   inputText = model.required<string >()
//   @Input() eventType:string=''
//   @Output() customEvent = new EventEmitter<Event>();
//  // @Output() inputTextChange = new EventEmitter<string>();

//   constructor(private el: ElementRef, private renderer: Renderer2) { }

//   change(event:any){
//     this.inputText.update(()=>event.target.value)
//     //this.inputTextChange.emit(this.inputText)

//   }

//   ngOnInit(): void {
//     if (this.eventType != undefined) {
//       this.renderer.listen(this.el.nativeElement, this.eventType, (event) => {
//         this.customEvent.emit(event);
//       });
//     }

//   }
//   ngOnChanges(changes: SimpleChanges) {
//     for (const inputName in changes) {
//       const inputValues = changes[inputName];
//       console.log(`Previous ${inputName} == ${inputValues.previousValue}`);
//       console.log(`Current ${inputName} == ${inputValues.currentValue}`);
//       console.log(`Is first ${inputName} change == ${inputValues.firstChange}`);
//     }
//   }
// }

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-test2',
  standalone: true,
  imports: [],
  templateUrl: './test2.component.html',
  styleUrl: './test2.component.css'
})
export class Test2Component { 
  receivedObject: any;

  constructor(private router: Router) { 
    // this.receivedObject = this.router.getCurrentNavigation()?.extras.state?.['data']
  }

  ngOnInit(): void {
    const navigation = this.router.lastSuccessfulNavigation;
    this.receivedObject = navigation?.extras.state?.['data'];
   // console.log(this.receivedObject)

    // this.receivedObject = history.state
    
    
  }
}
