import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChangeDetectionStrategy, Component, ContentChildren, QueryList, signal, computed, effect, input, output, AfterContentInit, OnDestroy } from '@angular/core';
import { Observable, isObservable, Subscription } from 'rxjs';
import { TcolumnComponent } from '../tcolumn/tcolumn.component';

export enum Direction { asc = 'asc', desc = 'desc' }

export interface SortChangeEvent {
  columnName: string;
  direction: Direction;
}

export interface PaginationChangeEvent {
  currentPage: number;
  pageSize: number | null;
}

export interface Column<T> {
  name: string;
  property: keyof T;
  sortable: boolean;
  sortDirection: Direction | null;
}

@Component({
  selector: 't-grid',
  imports: [CommonModule, FormsModule],
  templateUrl: './tgrid.component.html',
  styleUrl: './tgrid.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TgridComponent<T> implements AfterContentInit, OnDestroy {
 
  // SPECS 
  data = input<T[] | Observable<T[]>>([]);
  sortable = input<boolean>(true);
  pageSize = input<number | null>(null);
  
  sortChange = output<SortChangeEvent>();
  paginationChange = output<PaginationChangeEvent>();
  // END SPECS

  PAGE_SIZES = [
    {value: 5, label: '5'},
    {value: 10, label: '10'},
    {value: 20, label: '20'},
    {value: null, label: 'All'}
  ];

  Direction = Direction;

  @ContentChildren(TcolumnComponent) columnTemplates!: QueryList<TcolumnComponent<T>>;

  columns = signal<Column<T>[]>([]);

  nextPageEnabled = computed(() => this.currentPage() < this.totalPages());
  previousPageEnabled = computed(() => this.currentPage() > 1);

  currentPage = signal<number>(1);
  
  private _currentData = signal<T[]>([]);
  private dataSubscription?: Subscription;
  
  sortedData = computed(() => {
      const data = this._currentData();
      const sortedColumn = this.sortedColumn();

      if (!sortedColumn || !sortedColumn.sortDirection) {
        return data;
      }

      return [...data].sort((a: T, b: T) => {
        const aValue = a[sortedColumn.property];
        const bValue = b[sortedColumn.property];
        
        if (aValue < bValue) {
          return sortedColumn.sortDirection === Direction.asc ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortedColumn.sortDirection === Direction.asc ? 1 : -1;
        }
        return 0;
      });
  });

  paginatedData = computed(() => {
    const data = this.sortedData();
    const pageSize = this.pageSize();
    if(!pageSize || pageSize === 0) return data;
    return data.slice((this.currentPage() - 1) * pageSize, this.currentPage() * pageSize);
  });
  
  totalPages = computed(() => {
    if(!this.pageSize() || this.pageSize() === 0) return 1;
    return Math.ceil(this.sortedData().length / this.pageSize()!);
  });
  
  totalItems = computed(() => this.sortedData().length);
  
  sortedColumn = signal<Column<T> | undefined>(undefined);
  
  constructor() {
    effect(() => {
      const data = this.data();
      if (isObservable(data)) {
        this.dataSubscription = data.subscribe(items => this._currentData.set(items));
      } else {
        this._currentData.set(data);
      }
    });

  }
  
  ngAfterContentInit() {  
    this.columns.set(this.columnTemplates.map((template) => ({
      name: template.name() || '',
      property: template.property() || ('' as keyof T),
      sortable: template.sortable() || false,
      sortDirection: null,
    })));
  }
  
  onSort(columnName: string): void {
    if(!this.sortable()) return;
    
    let column;
    if(this.sortedColumn()?.name === columnName) {
      column = this.sortedColumn();
    } else {
      column = this.columns().find(col => col.name === columnName);
    }

    if(!column) return;
    if(!column.sortable) return;

    const newDirection = column.sortDirection === Direction.asc ? Direction.desc : Direction.asc;
    this.sortedColumn.set({...column, sortDirection: newDirection});

    this.sortChange.emit({
      columnName: columnName,
      direction: newDirection
    });
  }
  
  onPageChange(page: number): void {
    this.currentPage.set(page);

    this.paginationChange.emit({
      currentPage: this.currentPage(),
      pageSize: this.pageSize()
    });
  }
  
  onPageSizeChange(event: Event): void {
    const pageSize = parseInt((event.target as HTMLSelectElement).value);
    this.currentPage.set(1);
    this.paginationChange.emit({
      currentPage: this.currentPage(),
      pageSize: pageSize || null
    });
  }
  
  ngOnDestroy(): void {
    if (this.dataSubscription) {
      this.dataSubscription.unsubscribe();
    }
  }
  
}
