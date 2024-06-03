import { api, getAllUsers, closeTest, createUsers } from '../helpers/helpers';
import { users } from '../helpers/objects';
import { IUser } from '#src/types/user.type';

beforeEach(async () => {
  await createUsers();
});

describe('POST Crear un usuario /user', () => {
  it('Cuando se quiera crear un usuario debe añadirse a la DB', async () => {
    const newUser: Partial<IUser> = {
      email: 'it12345@gmail.com',
      name: 'iting3',
      password: '@it123',
      role: 'adopter'
    };

    await api
      .post('/user')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /json/);
  
    const response = await getAllUsers();
    const emails = response.body.map((user: IUser) => user.email);

    expect(response.body.length === users.length + 1).toBe(true);
    expect(emails).toContain(newUser.email);
  });

  it('Si no se agrega un "name" deberia tirar un BAD_REQUEST', async () => {
    const newUser: Partial<IUser>  = {
      email: 'it12345@gmail.com',
      name: '',
      password: '@it123',
      role: 'rescuer'
    };

    await api.post('/user').send(newUser).expect(404);
    const response = await getAllUsers();
    if(response.body.length) {
      expect(response.body.length).toBe(users.length);
    }
  });

  it('Si la password no contiene un "@", una mayuscula y numeros, debe tirar un error 500', async () => {
    const newUser: Partial<IUser>  = {
      email: 'it12345@gmail.com',
      name: 'iter12',
      password: 'iteo',
      role: 'rescuer'
    };
  
    await api.post('/user').send(newUser).expect(500);
    const response = await getAllUsers();
    if (response.body.length) {
      expect(response.body.length).toBe(users.length);
    }
  });
});

afterAll(async () => {
  await closeTest();
});