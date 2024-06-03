import { createUsers, closeTest, api } from '../user/helpers/helpers';
import { createAnimals } from './helpers/helpers/helpers';
import Animal from '#src/database/tables/animal';
import { IAnimal } from '#src/types/animal.type';
import { animals } from './helpers/helpers/animal';

beforeEach(async () => {
  await createUsers();
  await createAnimals();
});

describe('GET /animal', () => {
  it('Deberia retornar un arreglo de animales', async () => {
    await api
      .get('/animal')
      .expect(200)
      .expect('Content-Type', /json/)
      .expect(res => {
        expect(res.body).toBeInstanceOf(Array);
      });
  });

  it('Si no hay animales deberia retornar NOT_FOUND', async () => {
    await Animal.destroy({ where: {} });
    await api.get('/animal').expect(404);
    await createUsers();
  });

  it('Deberia retornar un animal si se obtiene por "id"', async () => {
    await api
      .get('/animal/03e1fb5e-ade7-42f2-ad9a-2eaa2ebea5a8')
      .expect(200)
      .expect('Content-Type', /json/);
  });

  it('Deberia tirar un error 404 NOT_FOUND si el animal no existe', async () => {
    await api.get('/animal/584401f7-c236-40b7-9934-6283b06fec22').expect(404);
  });
});

describe('POST /animal', () => {
  it('Cuando se quiera crear un usuario debe añadirse a la DB', async () => {
    const newAnimal: Partial<IAnimal> = {
      id: '8be347ae-adf4-4b9f-85bc-e0e387580044',
      name: 'animal3',
      age: 2,
      species: 'dog',
      gender: 'male',
      size: 'large',
      description: 'animal1 description',
      images: ['https://estaticos-cdn.prensaiberica.es/clip/823f515c-8143-4044-8f13-85ea1ef58f3a_16-9-discover-aspect-ratio_default_0.webp'],
      video: 'www.youtube.com',
      status: 'adopted',
      weight: 30.7,
      healhtStatus: 'good',
      user_id: 'testing@gmail.com'
    };

    await api
      .post('/animal')
      .send(newAnimal)
      .expect(201)
      .expect('Content-Type', /json/);
  
    const response = await api.get('/animal');

    expect(response.body.length === animals.length + 1).toBe(true);
  });

  it('Si el animal no es correcto, al momento de crearlo deberia tirar un BAD_REQUEST', async () => {
    const newAnimal: Partial<IAnimal>  = {
      id: '8be347ae-adf4-4b9f-85bc-e0e387580044',
      name: '',
      age: 2,
      species: 'dog',
      gender: 'male',
      size: 'large',
      video: 'www.youtube.com',
      status: 'not adopted',
      weight: -435,
      healhtStatus: 'good',
      user_id: 'testing@gmail.com'
    };

    await api.post('/user').send(newAnimal).expect(500);
    const response = await api.get('/animal');
    expect(response.body.length).toBe(animals.length);
  });
});


afterAll(async () => {
  await closeTest();
});