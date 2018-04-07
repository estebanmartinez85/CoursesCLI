import {IUser} from "../interfaces/IUser";

export class User implements IUser{
  public firstName: string;
  public role: string;
  constructor(firstName:string,  role:string){
    this.firstName = firstName;
    this.role = role;
  }
}
