import { ChallengeService } from "../services/challenge.service";
import { System } from "./system.model";

export class Environment {
  public id: string;
  public name: string;
  constructor(private service: ChallengeService) { }

  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }

  get systems(): System[] {
    return this.service.getSystems.filter(system => system.environment_id === this.id);
  }
}