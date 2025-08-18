import { Component, input, output, computed, ChangeDetectionStrategy, effect } from '@angular/core';

@Component({
  selector: 't-progress',
  imports: [],
  templateUrl: './tprogress.html',
  styleUrl: './tprogress.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TProgress {
  // SPECS
  radius = input<number>(50);
  progress = input<number>(0);
  color = input<string>('#efefef');
  complete = output<void>(); // can be improved
  // END SPECS

  clampedRadius = computed(() => {
    if(this.radius() < 50) {
      console.warn('TProgress: Radius is less than 50, clamping to 50');
      return 50;
    }
    return this.radius();
  });

  clampedProgress = computed(
    () => {
      const progress = this.progress();
      if(progress < 0) {
        console.warn('TProgress: Progress is less than 0, clamping to 0');
        return 0;
      }
      if(progress > 100) {
        console.warn('TProgress: Progress is greater than 100, clamping to 100');
        return 100;
      }
      return progress;
    }
  );

  diameter = computed(() => this.clampedRadius() * 2);
  innerRadius = computed(() => this.clampedRadius() - this.strokeWidth() / 2);
  circumference = computed(() => 2 * Math.PI * this.innerRadius());
  targetOffset = computed(() => this.circumference() * (1 - this.clampedProgress() / 100));
  strokeWidth = computed(() => this.clampedRadius() / 5);
  
  private previousProgress: number = 0;
  private animationTimeout: number | null = null;

  constructor() {
    effect(() => {
      const currentProgress = this.clampedProgress();
      const previousProgress = this.previousProgress;
      
      if (this.animationTimeout) {
        clearTimeout(this.animationTimeout);
        this.animationTimeout = null;
      }
      
      if (currentProgress === 100 && previousProgress < 100) {
        this.animationTimeout = setTimeout(() => {
          this.complete.emit();
          this.animationTimeout = null;
        }, 1000);
      }
      
      this.previousProgress = currentProgress;
    });
  }
  
}