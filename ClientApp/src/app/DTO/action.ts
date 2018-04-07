export interface Action {
  name: string;
  method: string;
  href: string;
  title: string;
  type: string;
  fields: {name:string,  type:string}[];
}
