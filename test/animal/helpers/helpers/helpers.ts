import DataBase from '#src/database/db';
import Animal from '#src/database/tables/animal';
import { animals } from './animal';

export const createAnimals = async () => {
  await DataBase.getInstance().getConnection().sync({ force: true });
  await Promise.all(animals.map(async animal => {
    return Animal.create({ ...animal });
  }));
};