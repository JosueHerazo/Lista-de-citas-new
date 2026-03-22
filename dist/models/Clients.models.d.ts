import { Model } from 'sequelize-typescript';
<<<<<<< HEAD
import Date from './Datelist.models';
declare class Client extends Model {
    name: string;
    password: string;
    email: string;
    phone: number;
    terms: boolean;
    services: Date[];
=======
import Service from './service.model';
declare class Client extends Model {
    name: string;
    password: number;
    email: string;
    phone: number;
    terms: boolean;
    services: Service[];
>>>>>>> c6d54f15bc335c99e7da8a36440131c346d8cd45
}
export default Client;
