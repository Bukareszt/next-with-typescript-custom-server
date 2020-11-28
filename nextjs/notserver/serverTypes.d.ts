export interface IResponse {
  msg: string;
  data?: IUser | Array<IUser>;
}
export interface RequestBodyWithUserData {
  name: string;
}
