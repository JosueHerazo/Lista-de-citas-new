// Ejemplo de modelo corregido
import { Table, Model, DataType, ForeignKey, BelongsTo, Column } from 'sequelize-typescript';
import Client from './Clients.models';

@Table({
    tableName: 'dates',
    timestamps: true
})
class Datelist extends Model {
    @Column({
        type: DataType.STRING(100),
        allowNull: false
    })
    declare service: string;

    @Column({
        type: DataType.FLOAT
    })
    declare price: number;

    @Column({
        type: DataType.STRING(50),
        allowNull: false
    })
    declare barber: string;
    
    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    declare dateList: string;

    @Column({
        type: DataType.STRING(100),
        allowNull: true
    })
    declare client: string;

    @Column({
        type: DataType.STRING
    })
    declare phone: string;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        defaultValue: 30
    })
    declare duration: number;
    
    @ForeignKey(() => Client)
    @Column({
        type: DataType.INTEGER
    })
    declare clientId: number;
    
    @BelongsTo(() => Client)
    declare clientUsuario: Client;
}

export default Datelist;