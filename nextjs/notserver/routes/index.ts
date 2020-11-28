import { Request, Response, Router } from 'express';
import user, { IUser, IUserPattern } from '../db/user.model';
import { IResponse, RequestBodyWithUserData } from '../serverTypes';
import { prepareResponse } from '../utills/response';
const router = Router();

// resource -> User

// /users
// /users/:id

// function makeResourceForModel(model, customLogic){
//   return class {

//   }
// }

// const UserResource = makeResourceForModel(User)
// const PostResource = makeResourceForModel(Post, {

// })

class UsersResource {
  static getById = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      if (!id) {
        throw Error('Id of user is required!');
      }
      const userToReturn: IUser = await user.getUser(id);

      const resMsg = 'User data:';
      const response = prepareResponse(resMsg, userToReturn);

      res.status(200).json(response);
    } catch (err) {
      const msgWithError: string = `Problem with getting a user! Information about the error: ${err}`;

      const responseWithError: IResponse = prepareResponse(msgWithError);

      res.status(500).send(responseWithError);
    }
  };
  static getAll = async () => {};
  static patch = async () => {};
  static delete = async () => {};
}

router.get('/user/:id', UsersResource.getById);

router.get('/users', async (req: Request, res: Response) => {
  try {
    const users: Array<IUser> = await user.getUsers();

    const resMsg: string = 'List of users: ';
    const response: IResponse = prepareResponse(resMsg, users);

    res.status(200).json(response);
  } catch (err) {
    const msgWithError: string = `Problem with getting the user list! Information about the error: ${err} `;

    const responseWithError: IResponse = prepareResponse(msgWithError);

    res.status(500).send(responseWithError);
  }
});

router.post('/user', async (req: Request, res: Response) => {
  try {
    const userData: RequestBodyWithUserData = req.body;

    if (!userData) {
      throw Error('User data are required!');
    }

    const userToCreate: IUserPattern = {
      name: userData.name,
    };

    await user.createUser(userToCreate);

    const resMsg = 'User created!';
    const response: IResponse = prepareResponse(resMsg);

    res.status(201).json(response);
  } catch (err) {
    const errMsg: string = `Problem with creating a user! Information about the error: ${err}`;

    const responseWithError: IResponse = prepareResponse(errMsg);

    res.status(500).send(responseWithError);
  }
});

router.patch('/user/:id', async (req: Request, res: Response) => {
  try {
    const userData: RequestBodyWithUserData = req.body;
    if (!userData) {
      throw Error('User data are required!');
    }
    const id: string = req.params.id;
    if (!id) {
      throw Error('Id of user is required!');
    }

    await user.patchUser(id, userData);

    const resMsg: string = 'User patched!';
    const response: IResponse = prepareResponse(resMsg);

    res.status(202).json(response);
  } catch (err) {
    const errMsg: string = `Problem with patching a user! Information about the error: ${err}`;

    const responseWithError: IResponse = prepareResponse(errMsg);

    res.status(500).send(responseWithError);
  }
});

router.delete('/user/:id', async (req: Request, res: Response) => {
  try {
    const id: string = req.params.id;
    if (!id) {
      throw Error('Id of user is required!');
    }
    await user.deleteUser(id);

    const resMsg: string = 'User deleted!';
    const response: IResponse = prepareResponse(resMsg);

    res.status(200).send(response);
  } catch (err) {
    const errMsg: string = `Problem with deleting a user! Information about the error: ${err}`;

    const responseWithError: IResponse = prepareResponse(errMsg);

    res.status(500).send(responseWithError);
  }
});

export default router;
