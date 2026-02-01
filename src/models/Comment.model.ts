import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from "sequelize-typescript";
import News from "./New.model"; // Importamos el default

@Table({ tableName: "comments" })
export class Comment extends Model {
    @Column({ type: DataType.TEXT, allowNull: false })
    text!: string;

    @Column({ type: DataType.STRING, allowNull: false })
    userName!: string;

    @ForeignKey(() => News)
    @Column({ type: DataType.INTEGER, allowNull: false })
    newsId!: number;

    @BelongsTo(() => News)
    news!: News;
}

export default Comment; // <--- ¡Indispensable para sequelize-typescript!