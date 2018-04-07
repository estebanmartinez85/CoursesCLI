import { Entity } from "./entity";
import { Action } from "./action";

export interface SirenResponse {
  class: string[];
  properties: {[name:string]:string};
  entities: Entity[];
  actions: Action[];
}
