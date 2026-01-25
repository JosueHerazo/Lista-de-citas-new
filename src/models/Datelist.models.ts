import { Table, Column, Model,ForeignKey, BelongsTo, DataType, } from 'sequelize-typescript';
import Client from './Clients.models';
// import Client from './Clients.models';

@Table({
    tableName: 'dateslist'
})
class Datelist extends Model {
    @Column({
        type: DataType.STRING(100),
        allowNull: false
    })
    declare service: string;

    @Column({
        type: DataType.FLOAT(), // O DECIMAL(10,2) para dinero
    })
    declare price: number;

    @Column({
        type: DataType.STRING(50),
        allowNull: false
    })
    declare barber: string;
    
    @Column({
        type: DataType.DATE()
    })
    declare date: Date;

    @Column({
        type: DataType.STRING(100)
    })
    declare client: string;

    @Column({
        type: DataType.BIGINT()
    })
    declare phone: number;
    
    @ForeignKey(() => Client)
    @Column({
        type: DataType.INTEGER()
    })
    declare clientId: number;
    
    @BelongsTo(() => Client)
    declare clientUsuario: Client;
    
    
    // --- CORRECCIÓN AQUÍ ---
}
    export default Datelist;