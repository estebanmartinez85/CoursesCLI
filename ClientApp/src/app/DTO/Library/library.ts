import {Entity} from "../entity";

export class Library {
  public class: string[];
  public properties: {id:string, title:string, courseCount:number}[];
  public entities: Entity[]
}
