import { api, createUsers, closeTest } from '../helpers/helpers';
import User from '#src/database/tables/user';
import { users } from '../helpers/objects';
import { ErrorTypes } from '#src/types/errors.type';

beforeEach(async () => {
  await createUsers();
});

describe('GET Obtener todos los usuarios /user', () => {
  it('Deberia retornar un arreglo de usuarios', async () => {
    await api
      .get('/user')
      .expect(200)
      .expect('Content-Type', /json/)
      .expect(res => {
        expect(res.body).toBeInstanceOf(Array);
      });
  });

  it('Si no hay usuarios deberia retornar NOT_FOUND', async () => {
    await User.destroy({ where: {} });
    await api.get('/user').expect(404);
    await createUsers();
  });
});

describe('GET Obtener un usuario por "id"', () => {
  it('Deberia retornar un usuario', async () => {
    const result = await api.get('/user/testing@gmail.com');
    expect(result.body).toEqual({
      ...users[0],
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
      password: expect.any(String),
    });
  });

  it('Si el usuario no existe debe tirar un error 404 NOT_FOUND', async () => {
    const result = await api.get('/user/testing2321@gmail.com').expect('Content-Type', /json/);
    expect(result.body).toEqual({ '404': ErrorTypes.NOT_FOUND });
  });
});

afterAll(async () => {
  await closeTest();
});