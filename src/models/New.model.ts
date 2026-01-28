import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import { Comment } from './Comment.model';

@Table({ tableName: 'news' })
export class News extends Model {
    @Column({ type: DataType.TEXT, allowNull: false })
    description!: string;

    @Column({ type: DataType.STRING, allowNull: false })
    url!: string;

    @Column({ 
        type: DataType.ENUM('image', 'video'), 
        defaultValue: 'image' 
    })
    type!: string;

    @Column({ type: DataType.INTEGER, defaultValue: 0 })
    likes!: number;

    @Column({ type: DataType.STRING, allowNull: false })
    clientName!: string;

    // Relación: Una noticia tiene muchos comentarios 💬
    @HasMany(() => Comment)
    comments!: Comment[];
}

export default News; // <--- ¡Esto es lo que pide el error!