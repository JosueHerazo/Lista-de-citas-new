import { Table, Column, Model, DataType, } from 'sequelize-typescript';
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
    declare dateList: Date;

    @Column({
        type: DataType.STRING(100)
    })
    declare client: string;

    @Column({
        type: DataType.BIGINT()
    })
    declare phone: number;
}


export default Datelist;

// -----------------------
    // Mantenemos estas columnas si las usas directamente en el form 
    // aunque lo ideal es que vengan de la relación con Client
// // --- AGREGA ESTO PARA ARREGLAR EL ERROR ---
// @ForeignKey(() => Client)
// @Column({
    //     type: DataType.INTEGER()
    // })
// declare clientId: number;

// @BelongsTo(() => Client)
// declare client: Client;
    

// --- CORRECCIÓN AQUÍ ---