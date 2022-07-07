import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'app-echart',
  templateUrl: './echart.component.html',
  styleUrls: ['./echart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EchartComponent {
  @Input() public options: any;
  @Input() public mergeOptions: any;
  constructor() { }
}
