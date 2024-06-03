import { users } from './objects';
import DataBase from '#src/database/db';
import User from '#src/database/tables/user';
import bcrypt from 'bcryptjs';
import supertest from 'supertest';
import { server } from '#src/server';

export const api = supertest(server);

export const createUsers = async () => {
  await DataBase.getInstance().getConnection().sync({ force: true });
  const salt = await bcrypt.genSalt(10);
  await Promise.all(users.map(async user => {
    const passwordHash = await bcrypt.hash(user.password, salt);
    return User.create({ ...user, password: passwordHash});
  }));
};

export const closeTest = async () => {
  await DataBase.getInstance().getConnection().drop();
  await DataBase.getInstance().getConnection().close();
  server.close();
};

export const getAllUsers = async () => {
  const response = await api.get('/user');
  return response;
};
