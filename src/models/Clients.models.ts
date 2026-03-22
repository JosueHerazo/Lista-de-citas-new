import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
<<<<<<< HEAD
import Date from './Datelist.models';
=======
import Date from './DateList.models';
import Service from './service.model';
>>>>>>> c6d54f15bc335c99e7da8a36440131c346d8cd45

@Table({
    tableName: 'clients'
})
class Client extends Model {
    @Column({
        type: DataType.STRING(100),
        allowNull: false
    })
    declare name: string;

    @Column({
        type: DataType.STRING(), // Guardamos como string para evitar problemas de ceros iniciales
        allowNull: false,
        unique: true
    })
    declare password: string;
    @Column({
        type: DataType.STRING(), // Guardamos como string para evitar problemas de ceros iniciales
        allowNull: false,
        unique: true
    })
    declare email: string;
    @Column({
        type: DataType.INTEGER(), // Guardamos como string para evitar problemas de ceros iniciales
        allowNull: false,
        unique: true
    })
    declare phone: number;
    @Column({
        type: DataType.BOOLEAN(), // Guardamos como string para evitar problemas de ceros iniciales
        allowNull: false,
<<<<<<< HEAD
        unique: true
=======
>>>>>>> c6d54f15bc335c99e7da8a36440131c346d8cd45
    })
    declare terms: boolean;

    // Relación: Un cliente puede tener muchos servicios registrados
<<<<<<< HEAD
    @HasMany(() => Date)
    declare services: Date[];
=======
    @HasMany(() => Service)
    declare services: Service[];
>>>>>>> c6d54f15bc335c99e7da8a36440131c346d8cd45
}

export default Client;