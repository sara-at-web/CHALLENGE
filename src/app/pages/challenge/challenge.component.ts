import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { BarSeriesOption, EChartsOption, LineSeriesOption } from 'echarts';
import moment from 'moment';
import { environment } from 'src/environments/environment';

import { Asset } from '../../models/asset.model';
import { ChallengeService } from '../../services/challenge.service';

moment.locale('fr');

interface SystemStackChart {
  id: string;
  options: EChartsOption;
}

interface PieData {
  name: string;
  value: number;
}

@Component({
  selector: 'app-challenge',
  templateUrl: './challenge.component.html',
  styleUrls: ['./challenge.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChallengeComponent implements AfterViewInit {
  public systemByEnvOpts: EChartsOption;
  public assetsBySystemOpts: EChartsOption;
  public systemsStackedCharts: SystemStackChart[];
  public machinesOutputsOpts: EChartsOption;
  private systemsIdsForStackedChart = ["sys002", "sys005", "sys006", "sys007"];
  private systemsIdsForAssetPieChart = ["sys005", "sys006", "sys007", "sys008", "sys009", "sys010", "sys011", "sys012", "sys013"];
  private machines: Asset[];
  constructor(
    private cdkRef: ChangeDetectorRef,
    private challengeService: ChallengeService
  ) {
  }

  //Pas besoin de toucher a l'initialisation
  ngAfterViewInit(): void {
    this.machines = this.challengeService.getAssets.filter(asset => asset.system_ids.includes("sys005"));
    this.systemByEnvOpts = {
      tooltip: {
        trigger: 'item'
      },
      series: [
        {
          type: 'pie',
          radius: ['40%', '70%'],
          itemStyle: {
            borderColor: '#fff',
            borderWidth: 2
          },
          data: this.systemByEnvData
        }
      ]
    }
    this.assetsBySystemOpts = {
      tooltip: {
        trigger: 'item'
      },
      series: [
        {
          type: 'pie',
          radius: ['40%', '70%'],
          itemStyle: {
            borderColor: '#fff',
            borderWidth: 2
          },
          data: this.assetBySystemData
        }
      ]
    }
    this.systemsStackedCharts = this.systemsIdsForStackedChart.map(system_id => {
      return {
        id: system_id,
        options: {
          tooltip: {
            trigger: 'axis',
            valueFormatter: (value) => `${value}°C`
          },
          legend: {
            data: this.getAssetNamesForSystem(system_id)
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: this.xAxisByHours,
          },
          yAxis: {
            type: 'value'
          },
          series: this.getTemperaturesByAssetForSystem(system_id)
        }
      }
    });
    this.machinesOutputsOpts = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      xAxis: {
        type: 'category',
        data: this.xAxisByDays
      },
      yAxis: {
        type: 'value'
      },
      series: this.machines.map(machine => this.getSerieForMachine(machine))
    }
    this.cdkRef.detectChanges();
  }

  getSystemName(system_id: string): string {
    return this.challengeService.getSystem(system_id)?.name;
  }
  /**
   * sert a grouper un ensemble de donnée par une proprieté specifique 
   */
  public groupBy(data : any[], property : string, ) : object{
        let result : object = {}
      data.forEach(function(item){
      let list = result[item[property]];
      if(list){
          list.push(item);
      } else{
          result [item[property]] = [item];
      }
    });
      return result;
    }

  /**
   * TODO: Récupérer le nombre de systemes par environnement
   * @returns {PieData[]} sous la forme [{name, value}]
   */
  get systemByEnvData(): PieData[] {

    let tmp = this.challengeService.getSystems
    let result : PieData[] = [];
    var groups = this.groupBy(tmp,'environment_id')
    for(let key in groups){
      result.push({name : key, value : groups[key].length })
    }
    return result;
  }

  /**
   * TODO: Récupérer le nombre d'assets par systeme depuis this.systemsIdsForAssetPieChart
   * @returns {PieData[]} sous la forme [{name, value}]
   */
  get assetBySystemData(): PieData[] {

    let tmp = this.challengeService.getAssets
    let result = []
    for(let SysId of this.systemsIdsForAssetPieChart){
    let clone = [...tmp];
    let filtredData = clone.filter( e =>e.system_ids[e.system_ids.findIndex(x => x === SysId)] === SysId)
    result.push({name : SysId, value : filtredData.length})
    }
    return result;
  }

  /**
   * Renvoie les premières 24h de la timeframe
   */
  get xAxisByHours(): string[] {
    return this.challengeService.timeframe.map(hour => moment(hour).format('lll')).slice(0, 24);
  }

  /**
   * TODO: récupérer les jours depuis challengeService.timeframe
   * tip: utiliser moment(hour).format('LL') pour récupérer le jour pour une heure donnée
   */
  get xAxisByDays(): string[] {
    return this.challengeService.timeframe.map(hour => moment(hour).format('LL'));
  }

  /**
   * récupère le nom des assets ayant des températures pour un système donné
   * @param system_id id du systeme
   * @returns noms des assets
   */
  getAssetNamesForSystem(system_id: string): string[] {

    return this.challengeService.getSystem(system_id).recursiveAssets
      .filter(asset => asset.data.some(assetData => assetData.name === "temperature"))
      .map(asset => asset.label)
  }

  /**
   * TODO: récupérer les valeurs des températures des assets
   * seul data[] doit être modifié
   * @param system_id id du systeme concerné
   * @returns Series pour le LineChart
   */
  getTemperaturesByAssetForSystem(system_id: string): LineSeriesOption[] {

    return this.challengeService.getSystem(system_id).recursiveAssets
      .filter(asset => asset.data.some(assetData => assetData.name === "temperature"))
      .map(asset =>  ({
        name: asset.label,
        type: 'line',
        data: asset.data[0].values
      }));

      
  }

  /**
   * récupérer le nombre d'objets fabriqués par jour par machine
   * TODO: construire la map machineOutputData de telle sorte a ce qu'elle renvoie la somme des outputs par jour
   * @returns Series pour le LineChart
   */
  getSerieForMachine(machine: Asset): BarSeriesOption {
    const machineOutputData = new Map<string, number>();
    let outputs = machine.data[1].values
    let days = new Set<string>(outputs.map(item => ( moment(item.timestamp).format('LL') )));
    days.forEach(day => {
        let fabricationbyday = outputs.filter(item => moment(item.timestamp).format('LL') == day )
        const result = fabricationbyday.reduce((accumulator, obj) => {
          return accumulator + obj.value;
        }, 0);
        machineOutputData.set(day,result )
    })
    return {
      name: machine.label,
      type: 'bar',
      stack: 'total',
      label: {
        show: true
      },
    
      data: Array.from(machineOutputData)

    }
  }

  ngForTrackByFn(index, item) {
    
    return item.id;
  }
  
}
