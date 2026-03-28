import { Model } from 'sequelize-typescript';
import List from "../models/List.models";
declare class Client extends Model {
    name: string;
    password: string;
    email: string;
    phone: number;
    terms: boolean;
    services: List[];
}
export default Client;
