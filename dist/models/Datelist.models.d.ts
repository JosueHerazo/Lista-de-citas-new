import { Model } from 'sequelize-typescript';
import Client from './Clients.models';
declare class Datelist extends Model {
    service: string;
    price: number;
    barber: string;
    dateList: number;
    clientId: number;
    client: Client;
}
export default Datelist;
