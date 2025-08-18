import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TProgress } from './tprogress/tprogress';
import { PaginationChangeEvent, SortChangeEvent, TgridComponent } from './tgrid/tgrid.component';
import { TcolumnComponent } from './tcolumn/tcolumn.component';

interface Person {
  firstName: string;
  lastName: string;
  email: string;
  age: number;
}
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule, TProgress, TgridComponent, TcolumnComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  progress = signal(0);
  radius = signal(50);
  color = signal('#007bff');

  pageSize = signal<number | null>(5);

  myData: Person[] = [
    { firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', age: 30 },
    { firstName: 'Jane', lastName: 'Smith', email: 'jane.smith@example.com', age: 25 },
    { firstName: 'Bob', lastName: 'Johnson', email: 'bob.johnson@example.com', age: 35 },
    { firstName: 'Alice', lastName: 'Brown', email: 'alice.brown@example.com', age: 28 },
    { firstName: 'Charlie', lastName: 'Wilson', email: 'charlie.wilson@example.com', age: 32 },
    { firstName: 'Diana', lastName: 'Davis', email: 'diana.davis@example.com', age: 27 },
    { firstName: 'Edward', lastName: 'Miller', email: 'edward.miller@example.com', age: 40 },
    { firstName: 'Fiona', lastName: 'Garcia', email: 'fiona.garcia@example.com', age: 29 },
    { firstName: 'George', lastName: 'Martinez', email: 'george.martinez@example.com', age: 33 },
    { firstName: 'Helen', lastName: 'Robinson', email: 'helen.robinson@example.com', age: 31 },
    { firstName: 'Ian', lastName: 'Clark', email: 'ian.clark@example.com', age: 26 },
    { firstName: 'Julia', lastName: 'Rodriguez', email: 'julia.rodriguez@example.com', age: 34 },
    { firstName: 'Kevin', lastName: 'Lopez', email: 'kevin.lopez@example.com', age: 28 },
    { firstName: 'Linda', lastName: 'Hernandez', email: 'linda.hernandez@example.com', age: 30 },
    { firstName: 'Michael', lastName: 'Garcia', email: 'michael.garcia@example.com', age: 32 },
    { firstName: 'Nancy', lastName: 'Martinez', email: 'nancy.martinez@example.com', age: 29 },
    { firstName: 'Oliver', lastName: 'Davis', email: 'oliver.davis@example.com', age: 31 },
    { firstName: 'Patricia', lastName: 'Rodriguez', email: 'patricia.rodriguez@example.com', age: 27 },
    { firstName: 'Quincy', lastName: 'Martinez', email: 'quincy.martinez@example.com', age: 33 },
  ];
  

  onSortChange(event: SortChangeEvent): void {
    console.log('Sort change:', event);
  }

  onPaginationChange(event: PaginationChangeEvent): void {
    this.pageSize.set(event.pageSize);
    console.log('Pagination change:', event);
  }
}
