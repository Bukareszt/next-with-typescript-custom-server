import { IUser } from '../db/user.model';
import { IResponse } from '../serverTypes';

export function prepareResponse(
  msg: string,
  dataToSend?: IUser | Array<IUser>
): IResponse {
  if (dataToSend) {
    return {
      msg: msg,
      data: dataToSend,
    };
  } else {
    return { msg: msg };
  }
}
