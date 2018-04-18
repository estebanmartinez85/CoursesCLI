import { Action } from "./action";

export interface SirenEntity {
  class: string[];
  properties: {[name:string]:string};
  entities: SirenEntity[];
  actions: Action[];
  links: {[name:string]:any}[];
}
