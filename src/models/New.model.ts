// models/News.js
import { DataTypes } from 'sequelize';
import db from '../config/db.js';

const News = db.define('news', {
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    url: {
        type: DataTypes.STRING,
        allowNull: false
    },
    type: {
        type: DataTypes.ENUM('image', 'video'),
        defaultValue: 'image'
    },
    likes: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    clientName: { // Para saber quién lo publicó
        type: DataTypes.STRING,
        allowNull: false
    }
});

export default News;