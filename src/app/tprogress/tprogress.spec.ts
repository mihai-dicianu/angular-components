import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TProgress } from './tprogress';

describe('TProgress', () => {
  let component: TProgress;
  let fixture: ComponentFixture<TProgress>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TProgress]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TProgress);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
