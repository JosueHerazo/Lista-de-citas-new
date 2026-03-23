import { Model } from 'sequelize-typescript';
declare class Client extends Model {
    name: string;
    password: string;
    email: string;
    phone: number;
    terms: boolean;
    services: Date[];
}
export default Client;
