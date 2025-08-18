import { ChangeDetectionStrategy, Component, computed, input, signal } from '@angular/core';
import { Direction } from '../tgrid/tgrid.component';

@Component({
  selector: 't-column',
  imports: [],
  template: `
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TcolumnComponent<T = any> {
  name = input<string>('');
  property = input<keyof T>('' as keyof T);
  sortable = input<boolean>(false);
}
