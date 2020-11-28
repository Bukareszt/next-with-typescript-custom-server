import { model, Schema, Document, Model } from 'mongoose';

export interface IUserPattern {
  name: string;
}

export interface IUser extends Document, IUserPattern {}

interface IUserModel extends Model<IUser> {
  createUser(userToCreate: IUserPattern): Promise<void>;
  getUser(_id: string): Promise<IUser>;
  getUsers(): Promise<Array<IUser>>;
  deleteUser(_id: string): Promise<void>;
  patchUser(_id: string, userToPatch: IUserPattern): Promise<void>;
}

const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
});

UserSchema.statics.createUser = async function (
  userToAdd: IUserPattern
): Promise<void> {
  const entry: IUser = new this(userToAdd);
  const saved = await entry.save();
  return;
};

UserSchema.statics.getUser = async function (_id: string): Promise<IUser> {
  const found = await this.findById(_id);
  return found;
};

UserSchema.statics.getUsers = async function (): Promise<Array<IUser>> {
  const listOfUsers = await this.find();
  return listOfUsers;
};

UserSchema.statics.deleteUser = async function (_id: string): Promise<void> {
  await this.findByIdAndDelete(_id);
  return;
};

UserSchema.statics.patchUser = async function (
  _id: string,
  userToPatch: IUserPattern
): Promise<void> {
  const changed = await this.findByIdAndUpdate(_id, userToPatch);
  return;
};


const UserModel = model<IUser, IUserModel>('User', UserSchema);
export default UserModel;
