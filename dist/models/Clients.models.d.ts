import { Model } from 'sequelize-typescript';
import DateList from './List.models';
declare class Client extends Model {
    name: string;
    password: string;
    email: string;
    phone: number;
    terms: boolean;
    services: DateList[];
}
export default Client;
