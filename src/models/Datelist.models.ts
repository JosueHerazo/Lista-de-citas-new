import { Table, Column, Model,ForeignKey, BelongsTo, DataType, } from 'sequelize-typescript';
import Client from './Clients.models';
// import Client from './Clients.models';

@Table({
    tableName: 'dates'
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
        type: DataType.STRING(),
        allowNull: false
    })
    declare dateList: string;

    @Column({
        type: DataType.STRING(100),
        allowNull: true
        // Ponlo en true temporalmente para que no falle al sincronizar
    })
    declare client: string;

    @Column({
        type: DataType.STRING()
    })
    declare phone: string;
    @Column({
        type: DataType.INTEGER, // Guardaremos minutos (30, 60, etc)
        allowNull: false,
        defaultValue: 30
        
    })
    declare duration: number;
    
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