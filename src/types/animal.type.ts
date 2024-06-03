import { Model } from 'sequelize';

type Status = 'not adopted' | 'in progress' | 'adopted';

export interface IAnimal {
    id: string;
    name: string;
    images: string[];
    video: string;
    species: string;
    age: number;
    gender: string;
    size: string;
    weight: number;
    description: string;
    healhtStatus: string;
    status: Status;
    user_id: string;
}

export interface IAnimalModel extends Model, IAnimal {
    createdAt: Date;
    updatedAt: Date;
}