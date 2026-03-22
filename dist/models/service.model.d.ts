import { Model } from 'sequelize-typescript';
import Client from './Clients.models';
declare class Service extends Model {
    service: string;
    price: number;
    barber: string;
    client: string;
    phone: number;
<<<<<<< HEAD
=======
    isPaid: boolean;
>>>>>>> c6d54f15bc335c99e7da8a36440131c346d8cd45
    clientId: number;
    clientData: Client;
}
export default Service;
