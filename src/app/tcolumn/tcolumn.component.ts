import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 't-column',
  imports: [],
  template: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TcolumnComponent<T = any> {
  name = input<string>('');
  property = input<keyof T>('' as keyof T);
  sortable = input<boolean>(false);
}
