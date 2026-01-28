// models/Comment.js
import { DataTypes } from 'sequelize';
import db from '../config/db.js';

const Comment = db.define('comment', {
    text: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    userName: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

// Relaciones
import News from './New.model.js';

News.hasMany(Comment, { onDelete: 'CASCADE' });
Comment.belongsTo(News);

export { News, Comment };