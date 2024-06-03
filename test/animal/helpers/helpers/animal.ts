import { IAnimal } from '#src/types/animal.type';
import { users } from 'test/user/helpers/objects';

export const animals: Partial<IAnimal>[] = [
  {
    id: '03e1fb5e-ade7-42f2-ad9a-2eaa2ebea5a8',
    name: 'animal1',
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
    user_id: users[0].email,
  },
  {
    id: 'cf1c72af-fa39-4ab1-83cc-4f179d5f7b16',
    name: 'animal2',
    age: 8,
    species: 'cat',
    gender: 'female',
    size: 'small',
    description: 'animal2 description',
    images: ['https://images.ctfassets.net/denf86kkcx7r/4IPlg4Qazd4sFRuCUHIJ1T/f6c71da7eec727babcd554d843a528b8/gatocomuneuropeo-97?fm=webp&w=913'],
    video: 'www.youtube.com',
    status: 'in progress',
    weight: 9,
    healhtStatus: 'very good',
    user_id: users[1].email,
  }
];