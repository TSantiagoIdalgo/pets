import { IAnimal } from '#src/types/animal.type';
import Animal from '#src/database/tables/animal';

export default class AnimalCommandModel {
  public createAnimal (animal: IAnimal) {
    return Animal.create({ ...animal });
  }

  public async deleteAnimal (id: string) {
    return Animal.destroy({ where: { id } });
  }
}