import { ChangeDetectionStrategy, Component } from '@angular/core';
import challengeData from '../../dataset.json';

interface DataTableInterface {
  tableName: string;
  tableKeys: string[];
  tableData: any[];
}

@Component({
  selector: 'app-data-preview',
  templateUrl: './data-preview.component.html',
  styleUrls: ['./data-preview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataPreviewComponent {
  //ATTENTION: Ne pas modifier ce component ou ses méthodes, il sert uniquement à la visualisation des données
  public tables: DataTableInterface[];
  constructor() {
    this.tables = [];
    Object.keys(challengeData).forEach(model => {
      if (model !== 'timeframe') {
        this.tables.push({
          tableName: model,
          tableKeys: Object.keys((challengeData as any)[model][0]),
          tableData: (challengeData as any)[model]
        })
      }
    });
  }
  getDataForCell = (dataLine: any, key: string) => {
    if (typeof dataLine[key] === "object") {
      return dataLine[key].map((data: any) => !!data.values ? `${data.name} (${data.values.length})` : data).join(", ")
    }
    else return dataLine[key];
  }
}
