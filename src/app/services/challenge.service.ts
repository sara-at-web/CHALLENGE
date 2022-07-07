import { Injectable } from '@angular/core';

import challengeData from '../dataset.json';
import { Asset } from '../models/asset.model';
import { Environment } from '../models/environment.model';
import { System } from '../models/system.model';

@Injectable({
  providedIn: 'root'
})
export class ChallengeService {
  //ATTENTION: ne pas modifier le service
  public timeframe: string[];
  private environments: Map<string, Environment>;
  private systems: Map<string, System>;
  private assets: Map<string, Asset>;
  constructor() {
    this.timeframe = [];
    this.environments = new Map<string, Environment>();
    this.systems = new Map<string, System>();
    this.assets = new Map<string, Asset>();
  }

  // Renvoie tous les environments du store
  public get getEnvironments(): Environment[] {
    return Array.from(this.environments.values());
  }

  /**
   * Renvoie un environnement pour un id donné
   * @param {string} environmentId id de l'environnement recherché
   * @returns {Environment} Environnement
   */
  public getEnvironment(environmentId: string): Environment {
    return this.environments.get(environmentId);
  }

  // Renvoie tous les systèmes du store
  public get getSystems(): System[] {
    return Array.from(this.systems.values());
  }

  /**
   * Renvoie un système pour un id donné
   * @param {string} systemId id du système recherché
   * @returns {System} Système
   */
  public getSystem(systemId: string): System {
    return this.systems.get(systemId);
  }

  // Renvoie tous les assets du store
  public get getAssets(): Asset[] {
    return Array.from(this.assets.values());
  }

  /**
   * Renvoie un asset pour un id donné
   * @param {string} assetId id de l'asset
   * @returns {Asset} Asset
   */
  public getAsset(assetId: string): Asset {
    return this.assets.get(assetId);
  }

  /**
   * Initialisation de la data depuis le fichier json
   */
  public initDataFromJson() {
    this.timeframe = challengeData.timeframe;
    challengeData.environments.forEach((environment: any) => {
      this.environments.set(environment.id, new Environment(this).deserialize(environment));
    });
    challengeData.systems.forEach((system: any) => {
      this.systems.set(system.id, new System(this).deserialize(system));
    });
    challengeData.assets.forEach((asset: any) => {
      this.assets.set(asset.id, new Asset(this).deserialize(asset));
    });
  }
}
