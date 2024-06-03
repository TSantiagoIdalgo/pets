import { users } from '../helpers/objects';
import UserQueryModel from '#src/models/user/user-query-model';
import UserCommandModel from '#src/models/user/user-command-model';
import User from '#src/database/tables/user';
import ErrorHandler from '#src/helpers/error-handler';


jest.mock('#src/database/tables/user'); 
const userModel = new UserQueryModel();
const userCommandModel = new UserCommandModel(userModel);

describe('createUser', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  it('should create a user', async () => {
    const userParse = { ...users[0], password: '@Test123' };
    users.push(userParse);
    (User.create as jest.Mock).mockReturnValue(userParse);
    await userCommandModel.create(userParse);

    expect(User.create).toHaveBeenCalledWith({ ...userParse });
  });

  it('If it doesn`t have a name, it should throw an error', async () => {
    const user = { ...users[0], name: '', password: '@Test123' };
    (User.create as jest.Mock).mockReturnValue(user);
    
    expect(async () => await userCommandModel.create(user)).rejects.toThrow(ErrorHandler);
  });

  it('If it doesn`t have a valid password, should throw and error', async () => {
    const user = { ...users[0], password: 'XXXX' };
    (User.create as jest.Mock).mockReturnValue(user);

    expect(async () => await userCommandModel.create(user)).rejects.toThrow(ErrorHandler);
  });
  
  it('If it doesn`t have a valid email, should throw and error', async () => {
    const user = { ...users[0], email: 'XXXX' };
    (User.create as jest.Mock).mockReturnValue(user);

    expect(async () => await userCommandModel.create(user)).rejects.toThrow(ErrorHandler);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });
});

describe('UpdateUser', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  it('should update a user', async () => {
    const userParse = { ...users[0], password: '@Test123' };
    (User.update as jest.Mock).mockReturnValue(userParse);
    (User.findByPk as jest.Mock).mockReturnValue(userParse);
    users.pop();
    users.push(userParse);

    const result = await userCommandModel.update(userParse.email, userParse);
    expect(User.update).toHaveBeenCalledWith(userParse, { where: { email: userParse.email} });
    expect(result).toEqual(userParse);
  });

  it('Should throw an error if "user" are incorrect', async () => {
    const user = { ...users[0], password: 'Test123', email: 'test123gmail.com', name: '' };
    (User.update as jest.Mock).mockReturnValue(user);

    const result = userCommandModel.update(user.email, user);
    expect(result).rejects.toThrow(ErrorHandler);
    expect(User.update).not.toHaveBeenCalled();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });
});

describe('DeleteUser', () => {
  it('should delete a user', async () => {
    const userParse = { ...users[0], password: '@Test123' };
    (User.findByPk as jest.Mock).mockReturnValue(userParse);
    users.shift();

    const result = await userCommandModel.delete(userParse.email);
    expect(User.findByPk).toHaveBeenCalledWith(userParse.email);
    expect(result).toEqual(userParse);
    expect(User.destroy).toHaveBeenCalledWith({ where: { email: userParse.email } });
  });
});