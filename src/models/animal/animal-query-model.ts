import Animal from '#src/database/tables/animal';
import { IAnimal } from '#src/types/animal.type';
import { Filter } from '#src/types/animal/animal-query-model';
import { Op } from 'sequelize';

export default class AnimalQueryModel {
  async getAll(filter: Filter) {
    const { page = 1, size = 10, props = {} } = filter;
    const offset = (page - 1) * size;
    const limit = size;
    const where: Record<string, any> = {};

    if (props.healthStatus) {
      where.healthStatus = props.healthStatus;
    }

    if (props.name) {
      where.name = {
        [Op.iLike]: `%${props.name}%`
      };
    }

    if (props.status) where.status = props.status;
    if (props.species) where.species = props.species;
    if (props.age !== undefined) where.age = props.age;
    if (props.gender) where.gender = props.gender;
    if (props.size) where.size = props.size;

    if (props.weight !== undefined) where.weight = props.weight;
    
    const { rows, count } = await Animal.findAndCountAll({
      where,
      offset,
      limit,
    });

    return {
      total: count,
      page,
      size,
      data: rows,
    };
  }

  getById(id: string): Promise<IAnimal | null> {
    return Animal.findByPk(id);
  }
}