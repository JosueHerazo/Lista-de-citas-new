import { Model } from 'sequelize-typescript';
import Client from './Clients.models';
<<<<<<< HEAD
declare class Datelist extends Model {
=======
declare class DateList extends Model {
>>>>>>> c6d54f15bc335c99e7da8a36440131c346d8cd45
    service: string;
    price: number;
    barber: string;
    date: string;
    clientId: number;
    client: Client;
}
<<<<<<< HEAD
export default Datelist;
=======
export default DateList;
>>>>>>> c6d54f15bc335c99e7da8a36440131c346d8cd45
