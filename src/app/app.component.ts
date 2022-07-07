import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ChallengeService } from './services/challenge.service';

interface LinkInterface {
  label: string,
  link: string,
  icon: string
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  title = 'sparte-challenge';
  public navLinks: LinkInterface[];

  constructor(private challengeService: ChallengeService) {
    this.navLinks = [
      {
        label: 'Instructions',
        link: 'home',
        icon: 'home'
      },
      {
        label: 'Challenge',
        link: 'challenge',
        icon: 'psychology'
      },
      {
        label: 'DataSet Preview',
        link: 'dataset',
        icon: 'dataset'
      }
    ];
  }

  ngOnInit(): void {
    this.challengeService.initDataFromJson();
  }

  trackByIdx(index: number) {
    return index;
  }
}
