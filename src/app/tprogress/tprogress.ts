import { Component, input, output, computed, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 't-progress',
  imports: [],
  templateUrl: './tprogress.html',
  styleUrl: './tprogress.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TProgress {
  radius = input<number>(50);
  progress = input<number>(0);
  color = input<string>('#efefef');
  // TODO: Decide when to emit
  complete = output<void>();

  diameter = computed(() => this.radius() * 2);
  innerRadius = computed(() => this.radius() - this.strokeWidth() / 2);
  circumference = computed(() => 2 * Math.PI * this.innerRadius());
  targetOffset = computed(() => this.circumference() * (1 - this.clampedProgress() / 100));
  strokeWidth = computed(() => this.radius() / 5);
  clampedProgress = computed(() => Math.max(0, Math.min(100, this.progress())));

  constructor() {
  }
  
}