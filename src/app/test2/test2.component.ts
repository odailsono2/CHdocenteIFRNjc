import { Component, ElementRef, EventEmitter, Input, Output, Renderer2, input, output } from '@angular/core';

@Component({
  selector: 'app-test2',
  standalone: true,
  imports: [],
  templateUrl: './test2.component.html',
  styleUrl: './test2.component.css'
})
export class Test2Component { 
  @Input() inputText:string = ''
  @Input() eventType:string=''
  @Output() customEvent = new EventEmitter<Event>();
  @Output() inputTextChange = new EventEmitter<string>();

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  change(event:any){
    this.inputText = event.target.value as string
    this.inputTextChange.emit(this.inputText)

  }

  ngOnInit(): void {
    if (this.eventType != undefined) {
      this.renderer.listen(this.el.nativeElement, this.eventType, (event) => {
        this.customEvent.emit(event);
      });
    }

  }
}
