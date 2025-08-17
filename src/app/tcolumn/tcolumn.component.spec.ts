import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TcolumnComponent } from './tcolumn.component';

describe('TColumn', () => {
  let component: TcolumnComponent<any>;
  let fixture: ComponentFixture<TcolumnComponent<any>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TcolumnComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TcolumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });   

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
