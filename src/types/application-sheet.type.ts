import { Model } from 'sequelize';

export interface IApplicationSheet {
    id?: string;
    location: string;
    phone: string;
    age: number;
    occupation?: string;
    home_type: string;
    reasons_for_adopting: string;
    home_visit_agreement: boolean;
    preferred_gender: string;
    user_id: string;
}

export interface IApplicationSheetModel extends Model, IApplicationSheet {
    createdAt: Date;
    updatedAt: Date;
}