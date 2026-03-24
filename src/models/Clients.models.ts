import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript'
import List from "../models/List.models"
@Table({ tableName: 'clients' })
class Client extends Model {
    @Column({ type: DataType.STRING(100), allowNull: false })
    declare name: string

    @Column({ type: DataType.STRING(), allowNull: false, unique: true })
    declare password: string

    @Column({ type: DataType.STRING(), allowNull: false, unique: true })
    declare email: string

    @Column({ type: DataType.INTEGER(), allowNull: false, unique: true })
    declare phone: number

    @Column({ type: DataType.BOOLEAN(), allowNull: false, unique: true })
    declare terms: boolean

    @HasMany(() => List)
    declare services: List[]
}

export default Client