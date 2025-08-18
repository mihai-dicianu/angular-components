import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TgridComponent } from './tgrid.component';

describe('TGrid', () => {
  let component: TgridComponent<any>;
  let fixture: ComponentFixture<TgridComponent<any>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TgridComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TgridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });   

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
