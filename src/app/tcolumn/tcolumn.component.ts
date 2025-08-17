import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input, output, signal } from '@angular/core';
import { Direction } from '../tgrid/tgrid.component';

@Component({
  selector: 't-column',
  imports: [CommonModule],
  templateUrl: './tcolumn.component.html',
  styleUrl: './tcolumn.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TcolumnComponent<T = any> {
  name = input<string>('');
  property = input<keyof T>('' as keyof T);
  sortable = input<boolean>(false);
  sort = output<{ columnName: string; direction: Direction }>();

  sortDirection = signal<Direction | null>(null);
  isSorted = computed(() => this.sortDirection() !== null);
  
  Direction = Direction;
  
  toggleSort(): void {
    if (!this.sortable()) return;
    
    const currentDirection = this.sortDirection();
    
    if(!this.isSorted()) {
      this.sortDirection.set(Direction.asc);
    } else {
      this.sortDirection.set(currentDirection === Direction.asc ? Direction.desc : Direction.asc);
    }
    
    this.sort.emit({
      columnName: this.name(),
      direction: this.sortDirection()!
    });
  }

}
