import {IUser as User} from "./IUser";

export interface Token {
  token:string,
  expiresIn: number,
  firstName: string,
  role: string
}
