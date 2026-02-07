import { Model } from 'sequelize-typescript';
import News from './New.model';
export declare class Like extends Model {
    userId: string;
    newsId: number;
    news: News;
}
export default Like;
//# sourceMappingURL=Likes.model.d.ts.map