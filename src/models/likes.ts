// backend/src/models/Like.ts
import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/db';

interface LikeAttributes {
    id?: number;
    userId: string;
    newsId: number;
}

class Like extends Model<LikeAttributes> implements LikeAttributes {
    public id!: number;
    public userId!: string;
    public newsId!: number;
}

Like.init({
    userId: {
        type: DataTypes.STRING,
        allowNull: false
    },
    newsId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'like'
});

export default Like;