import {Injectable} from '@angular/core';
import {BaThemeConfigProvider, colorHelper} from '../../../theme';

@Injectable()
export class PieChartService {

  constructor(private _baConfig:BaThemeConfigProvider) {
  }

  getData() {
    let pieColor = this._baConfig.get().colors.custom.dashboardPieChart;
    return [
      {
        color: pieColor,
        description: 'Taxy 22/55',
        stats: '$ 57,820',
        icon: 'money',
      }, {
        color: pieColor,
        description: 'Taxy 23/39',
        stats: '$ 89,745',
        icon: 'money',
      }, {
        color: pieColor,
        description: 'Taxy 33/45',
        stats: '$ 178,391',
        icon: 'money',
      }, {
        color: pieColor,
        description: 'Taxy 33/55',
        stats: '$ 32,592',
        icon: 'money',
      }
    ];
  }
}
