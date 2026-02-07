import { Model } from 'sequelize-typescript';
import Date from './Datelist.models';
declare class Client extends Model {
    name: string;
    password: string;
    email: string;
    phone: number;
    terms: boolean;
    services: Date[];
}
export default Client;
//# sourceMappingURL=Clients.models.d.ts.map