import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import News from './News.model';

@Table({
    tableName: 'likes',
    timestamps: true // Útil para saber cuándo se dio el like 🕒
})
export class Like extends Model {
    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    userId!: string;

    @ForeignKey(() => News)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    newsId!: number;

    @BelongsTo(() => News)
    news!: News;
}

export default Like;