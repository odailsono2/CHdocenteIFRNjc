import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SortAndFindComponent } from './sort-and-find.component';

describe('SortAndFindComponent', () => {
  let component: SortAndFindComponent;
  let fixture: ComponentFixture<SortAndFindComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SortAndFindComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SortAndFindComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
