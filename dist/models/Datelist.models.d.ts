import { Model } from 'sequelize-typescript';
import Client from './Clients.models';
declare class Datelist extends Model {
    service: string;
    price: number;
    barber: string;
    dateList: string;
    client: string;
    phone: string;
    duration: number;
    clientId: number;
    clientUsuario: Client;
}
export default Datelist;
//# sourceMappingURL=Datelist.models.d.ts.map