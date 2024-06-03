import { users } from '../helpers/objects';
import { SECRET } from '#src/config/config';
import { usersPassword } from '../helpers/objects';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import UserQueryModel from '#src/models/user/user-query-model';
import User from '#src/database/tables/user';
import ErrorHandler from '#src/helpers/error-handler';

jest.mock('#src/database/tables/user'); 
const userModel = new UserQueryModel();

describe('getUsers', () => {
  it('should return a list of users', async () => {
    (User.findAll as jest.Mock).mockResolvedValue(users);

    const result = await userModel.getUsers();

    expect(result).toEqual(users);
    expect(User.findAll).toHaveBeenCalledTimes(1);
    expect(User.findAll).toHaveBeenCalledWith();
  });

  it('should return an empty list of users', async () => {
    (User.findAll as jest.Mock).mockResolvedValue([]);

    const result = await userModel.getUsers();
    expect(result).toEqual([]);
    expect(User.findAll).toHaveBeenCalledTimes(2);
    expect(User.findAll).toHaveBeenCalledWith();
  });
});

describe('GetUser', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  it('should return a user', async () => {
    (User.findByPk as jest.Mock).mockResolvedValue(users[0]);
    const result = await userModel.getUser('testing@gmail.com');

    expect(result).toEqual(users[0]);
    expect(User.findByPk).toHaveBeenCalledTimes(1);
    expect(User.findByPk).toHaveBeenCalledWith('testing@gmail.com');
  });

  it('should return undefined if the user does not exist', async () => {
    const result = await userModel.getUser('testingerrortest@gmail.com');

    expect(result).toBeNull();
    expect(User.findByPk).toHaveBeenCalledTimes(1);
    expect(User.findByPk).toHaveBeenCalledWith('testingerrortest@gmail.com');
  });
});

describe('GetLogin', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  it('It should return a string', async () => {
    (User.findByPk as jest.Mock).mockResolvedValue({ ...users[0], password: usersPassword });
    const spyGetUser = jest.spyOn(userModel, 'getUser');
    const result = await userModel.getLogin(users[0].email, '@Test123');

    expect(result).toEqual(expect.any(String));
    expect(spyGetUser).toHaveBeenCalledTimes(1);
    expect(spyGetUser).toHaveBeenCalledWith(users[0].email);
  });

  it('Should return a json web token ', async () => {
    (User.findByPk as jest.Mock).mockResolvedValue({ ...users[0], password: usersPassword });
    const spyGetUser = jest.spyOn(userModel, 'getUser');
    const result = await userModel.getLogin(users[0].email, '@Test123');
    const decoded = jwt.verify(result, SECRET);

    expect(decoded).toEqual(expect.any(Object));
    expect(spyGetUser).toHaveBeenCalledTimes(1);
    expect(spyGetUser).toHaveBeenCalledWith(users[0].email);
  });

  it('If the password is incorrect, it should throw an error', async () => {
    (User.findByPk as jest.Mock).mockResolvedValue(users[0]);
    await expect(userModel.getLogin(users[0].email, 'incorrect'))
      .rejects
      .toThrow(ErrorHandler);
    
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });
});

describe('GetNetworkLogin', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  it('should return a json web token', async () => {
    const user = users[0];
    (User.findByPk as jest.Mock).mockResolvedValue(user);
    const spyGetUser = jest.spyOn(userModel, 'getUser');
    
    const result = await userModel.getNetworkLogin(user.name, user.email);
    const decoded = jwt.verify(result, SECRET);

    expect(decoded).toEqual(expect.any(Object));
    expect(spyGetUser).toHaveBeenCalledTimes(1);
    expect(spyGetUser).toHaveBeenCalledWith(users[0].email);
  });

  it('If the user does not exist must create one', async () => {
    users.push(users[0]);
    (User.findByPk as jest.Mock).mockResolvedValue(null);
    (User.findAll as jest.Mock).mockResolvedValue(users);
    (User.create as jest.Mock).mockResolvedValue(users[0]);

    await userModel.getNetworkLogin(users[0].name, users[0].email);
    const result = await userModel.getUsers();

    expect(result).toEqual(users);
    expect(User.create).toHaveBeenCalledTimes(1);
    expect(User.findAll).toHaveBeenCalledTimes(1);
    expect(User.create).toHaveBeenCalledWith({ 
      email: users[0].email, 
      name: users[0].name, 
      password: expect.any(String)
    });
  });

  it('If the user exists, it should only return a token', async () => {
    (User.findByPk as jest.Mock).mockResolvedValue(users[0]);
    (User.findAll as jest.Mock).mockResolvedValue(users);

    await userModel.getNetworkLogin(users[0].name, users[0].email);
    const result = await userModel.getUsers();

    expect(result).toEqual(users);
    expect(User.create).toHaveBeenCalledTimes(0);
    expect(User.findAll).toHaveBeenCalledTimes(1);
    expect(result).toEqual(users);
  });

  it('If the user is created, a random password must be generated and encrypted', async () => {
    (User.findByPk as jest.Mock).mockResolvedValue(null);
    (User.findAll as jest.Mock).mockResolvedValue(users);
    (User.create as jest.Mock).mockResolvedValue(users[0]);
    const spySalt = jest.spyOn(bcrypt, 'genSalt');
    const spyBcrypt = jest.spyOn(bcrypt, 'hash');

    await userModel.getNetworkLogin(users[0].name, users[0].email);
    const result = await userModel.getUsers();

    expect(result).toEqual(users);
    expect(spySalt).toHaveBeenCalledTimes(1);
    expect(spyBcrypt).toHaveBeenCalledTimes(1);
    expect(spyBcrypt).toHaveBeenCalledWith(expect.any(String), expect.any(String));
    expect(User.create).toHaveBeenCalledTimes(1);
    expect(User.findAll).toHaveBeenCalledTimes(1);
    expect(User.create).toHaveBeenCalledWith({
      email: users[0].email,
      name: users[0].name,
      password: expect.any(String)
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });
});