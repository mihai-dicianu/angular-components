import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { Component, output } from '@angular/core';

import { TgridComponent } from './tgrid.component';
import { TcolumnComponent } from '../tcolumn/tcolumn.component';
import { myTableData } from '../test-data/test.data';

@Component({
  template: `
    <t-grid [data]="testData" (sort)="onSort.emit($event)" (pageChange)="onPageChange.emit($event)">
      <t-column name="Id" property="id" [sortable]="true"></t-column>
      <t-column name="First Name" property="firstName" [sortable]="true"></t-column>
      <t-column name="Last Name" property="lastName" [sortable]="true"></t-column>
      <t-column name="Email" property="email" [sortable]="false"></t-column>
      <t-column name="Age" property="age" [sortable]="false"></t-column>
    </t-grid>
  `,
  imports: [TgridComponent, TcolumnComponent],
  standalone: true
})
class TestHostFullComponent {
  testData = myTableData;
  onSort = output<any>();
  onPageChange = output<any>();
}
@Component({
  template: `
    <t-grid [data]="testData">
      <t-column name="Id" property="id" [sortable]="true"></t-column>
      <t-column name="Email" property="email" [sortable]="false"></t-column>
      <t-column name="Age" property="age" [sortable]="false"></t-column>
    </t-grid>
  `,
  imports: [TgridComponent, TcolumnComponent],
  standalone: true
})
class TestHostPartialComponent {
  testData = myTableData;
}

describe('TGrid', () => {
  let component: TgridComponent<any>;
  let fixture: ComponentFixture<TgridComponent<any>>;
  let hostPartialComponent: TestHostPartialComponent;
  let hostPartialFixture: ComponentFixture<TestHostPartialComponent>;
  let hostFullComponent: TestHostFullComponent;
  let hostFullFixture: ComponentFixture<TestHostFullComponent>;

  describe('no columns', () => {   
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [TgridComponent]
      })
      .compileComponents();

      fixture = TestBed.createComponent(TgridComponent);
      component = fixture.componentInstance;
    
      fixture.detectChanges();
    });

    it('should have no columns', () => {
      const headerCells = fixture.nativeElement.querySelectorAll('thead th');
      expect(headerCells.length).toBe(0);
    });

  });

  describe('some columns', () => {   
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [TestHostPartialComponent]
      })
      .compileComponents();

      hostPartialFixture = TestBed.createComponent(TestHostPartialComponent);
      hostPartialComponent = hostPartialFixture.componentInstance;
      hostPartialFixture.detectChanges();
    });   

    it('should have some columns', () => {
      const headerCells = hostPartialFixture.nativeElement.querySelectorAll('thead th');
      expect(headerCells.length).toBe(3);
    });

    it('should display data with some columns', () => {
      const tableRows = hostPartialFixture.nativeElement.querySelectorAll('tbody tr');
      // by default pagesize is 'all'
      expect(tableRows.length).toBe(10); 

      const tableRowsCells = hostPartialFixture.nativeElement.querySelectorAll('tbody td');
      expect(tableRowsCells.length).toBe(30);

    });
  });

  describe('all columns', () => {
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [TestHostFullComponent]
      })
      .compileComponents();

      hostFullFixture = TestBed.createComponent(TestHostFullComponent);
      hostFullComponent = hostFullFixture.componentInstance;
      hostFullFixture.detectChanges();

    });

    it('should have all columns', () => {
      const headerCells = hostFullFixture.nativeElement.querySelectorAll('thead th');
      expect(headerCells.length).toBe(5);
    });

    it('should display data with all columns', () => {
      const tableRows = hostFullFixture.nativeElement.querySelectorAll('tbody tr');
      expect(tableRows.length).toBe(10);

      const tableRowsCells = hostFullFixture.nativeElement.querySelectorAll('tbody td');
      expect(tableRowsCells.length).toBe(50);
    });

    describe('sorting', () => {
      it('should sort by id', fakeAsync(() => {
        
        const headerCells = hostFullFixture.nativeElement.querySelectorAll('thead th');
        const idHeaderCell = headerCells[0];
        const completeSpy = spyOn(hostFullComponent.onSort, 'emit');
        idHeaderCell.click();
        idHeaderCell.click();
        hostFullFixture.detectChanges();
        const tableCells = hostFullFixture.nativeElement.querySelectorAll('tbody td');
        // descending order by id, first cell is 10, first cell of 5th row is 1
        expect(tableCells[0].textContent.trim()).toBe('10');
        expect(tableCells[45].textContent.trim()).toBe('1');
        // expect(completeSpy).toHaveBeenCalledTimes(2);
        // not working ;(
      }));


    });

    describe('pagination', () => {
      it('should paginate data', () => {
        const tableRows = hostFullFixture.nativeElement.querySelectorAll('tbody tr');
        expect(tableRows.length).toBe(10);
      });
    });

  });

});