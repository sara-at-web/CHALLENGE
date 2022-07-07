import { ChangeDetectionStrategy, Component } from '@angular/core';

interface ChallengeData {
  name: string,
  challenges: string[]
}

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePageComponent {
  //ATTENTION: Ne pas modifier ce component ou ses méthodes
  public challengeData: ChallengeData[];

  constructor() {
    this.challengeData = [
      {
        name: 'Routing',
        challenges: [
          'Configurer la route <a href="./challenge">/challenge</a> dans app-routing.module.ts pour accéder à l\'épreuve.'
        ]
      },
      {
        name: 'Graphiques',
        challenges: [
          'Un <b><a href="https://echarts.apache.org/examples/en/editor.html?c=pie-doughnut" target="_blank">Pie Chart</a></b> représentant le nombre de systèmes par Environnement (parents et enfants confondus)',
          'Un <b><a href="https://echarts.apache.org/examples/en/editor.html?c=pie-doughnut" target="_blank">Pie Chart</a></b> représentant le nombre d\'assets pour les Systèmes entre les ids [sys005...sys013]',
          'Un <b><a href="https://echarts.apache.org/examples/en/editor.html?c=line-stack" target="_blank">Stacked Line Chart</a></b> \
           représentant l\'évolution des températures <b>par heure</b> (seulement les 24 premières) et par asset pour chacun des systèmes suivant : <br/>\
          <ol><li>sys002: Eau</li> <li>sys005: Ligne Production</li> <li>sys006: Haute Tension</li> <li>sys007: Basse Tension</li></ol>\
          Avec en abcisse les heures et en ordonnée les températures.<br/><b>Attention :</b> la fonction getAssets du modèle System n\'est pas récursive.',
          'Un <b><a href="https://echarts.apache.org/examples/en/editor.html?c=bar-y-category-stack" target="_blank">Stacked <u>Vertical</u> Bar Chart</a></b> représentant le nombre d\'éléments produits (data.name === "output") par Machine <b>par jour</b><br/>\
          <ul><li>Avec en abcisse les jours</li> <li>En ordonnée le nombre d\'élément <b>décomposé par Machine</b></li></ul>\
          <b>Attention :</b> dans l\'exemple en lien les axes sont inversés par rapport à l\'exercice demandé.'
        ]
      },
      {
        name: 'Ressources',
        challenges: [
          '<a href="./dataset" target="_blank">Dataset Preview</a>',
          '<a href="https://echarts.apache.org/en/option.html" target="_blank">Configuration Echart</a>'
        ]
      }
    ]
  }
}
