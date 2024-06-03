import { IAnimal } from '../animal.type';

type Status = 'not adopted' | 'in progress' | 'adopted';
interface FilterProps {
    healthStatus: string;
    name: string;
    status: Status;    
    species: string;
    age: number;
    gender: string;
    size: string;
    weight: number;
}

export interface Filter {
  page: number,
  size: number,
  props: Partial<FilterProps>
}

export interface IAnimalQueryModel {
  getAll(filter: Filter): Promise<IAnimal[]>;
  getById(id: string): Promise<IAnimal>;
}