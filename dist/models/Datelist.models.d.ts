import { Model } from 'sequelize-typescript';
import Client from './Clients.models';
declare class Datelist extends Model {
    service: string;
    price: number;
    barber: string;
    dateList: string;
    client: string;
    phone: string;
    isPaid: boolean;
    clientId: number;
    clientName: Client;
}
export default Datelist;
