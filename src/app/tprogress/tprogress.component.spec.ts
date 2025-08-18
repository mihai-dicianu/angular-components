import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { TProgress } from './tprogress.component';

describe('TProgress', () => {
  let component: TProgress;
  let fixture: ComponentFixture<TProgress>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TProgress],
    }).compileComponents();

    fixture = TestBed.createComponent(TProgress);
    component = fixture.componentInstance;
    fixture.autoDetectChanges();

    spyOn(console, 'warn');
  });

  
  it('should create', () => {
    const fixture = TestBed.createComponent(TProgress);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  describe('inputs', () => {
    describe('radius', () => {

      it('should clamp the radius to min 50', async () => {
        fixture.componentRef.setInput('radius', 30);
        fixture.autoDetectChanges();

        const svg = fixture.nativeElement.querySelector('svg');
        expect(svg.getAttribute('height')).toBe('100');
        expect(svg.getAttribute('width')).toBe('100');
      });

      it('should accept valid radius values', async () => {
        fixture.componentRef.setInput('radius', 60);
        await fixture.whenStable();
 
        const svg = fixture.nativeElement.querySelector('svg');
        expect(svg.getAttribute('height')).toBe('120');
        expect(svg.getAttribute('width')).toBe('120');
      });

      it('should warn when radius is less than 50', async () => {
        fixture.componentRef.setInput('radius', 25);
        await fixture.whenStable();
        const svg = fixture.nativeElement.querySelector('svg');
        expect(svg.getAttribute('height')).toBe('100');
        expect(svg.getAttribute('width')).toBe('100');
        expect(console.warn).toHaveBeenCalledWith('TProgress: Radius is less than 50, clamping to 50');
      });
    });

    describe('progress input', () => {
      it('should accept valid progress values', async () => {
        fixture.componentRef.setInput('progress', 50);
        expect(component.progress()).toBe(50);
      });

      it('should clamp progress to minimum of 0', async () => {
        fixture.componentRef.setInput('progress', -10);
        await fixture.whenStable();
        expect(console.warn).toHaveBeenCalledWith('TProgress: Progress is less than 0, clamping to 0');
        
        const circle = fixture.nativeElement.querySelector('circle.progress');
        expect(circle.style.strokeDasharray).toBe(circle.style.strokeDashoffset);
      });
      
      it('should clamp progress to maximum of 100', async () => {
        fixture.componentRef.setInput('progress', 150);
        await fixture.whenStable();
        expect(console.warn).toHaveBeenCalledWith('TProgress: Progress is greater than 100, clamping to 100');
        
        const circle = fixture.nativeElement.querySelector('circle.progress');
        expect(circle.style.strokeDashoffset).toBe('0px');
      });

    });

    describe('color input', () => {
      it('should accept color values', () => {
        fixture.componentRef.setInput('color', '#ff0000');
        fixture.detectChanges();

        expect(component.color()).toBe('#ff0000');
      });

      it('should have default color', () => {
        expect(component.color()).toBe('#efefef');
      });
    });


  });

  describe('outputs', () => {
    describe('complete', () => {
      it('should emit when progress is 100 after 1 second delay', fakeAsync(() => {
        const completeSpy = spyOn(component.complete, 'emit');
        fixture.componentRef.setInput('progress', 100);
        fixture.detectChanges();
        
        expect(completeSpy).not.toHaveBeenCalled();
        
        tick(1000);
        fixture.detectChanges();
        
        expect(completeSpy).toHaveBeenCalled();
      }));

      it('should not emit when progress is not 100', fakeAsync(() => {
        const completeSpy = spyOn(component.complete, 'emit');
        fixture.componentRef.setInput('progress', 50);
        fixture.detectChanges();
        
        tick(1500);
        fixture.detectChanges();
        
        expect(completeSpy).not.toHaveBeenCalled();
      }));

      it('should only emit once when progress reaches 100', fakeAsync(() => {
        const completeSpy = spyOn(component.complete, 'emit');
        
        fixture.componentRef.setInput('progress', 50);
        fixture.detectChanges();
        tick(500);
        
        fixture.componentRef.setInput('progress', 100);
        fixture.detectChanges();
        tick(1000);
        
        expect(completeSpy).toHaveBeenCalledTimes(1);
      }));
    });
  });

});

