import { Model } from 'sequelize-typescript';
import Comment from './Comment.model';
import { Like } from './Likes.model';
export declare class News extends Model {
    description: string;
    url: string;
    type: string;
    likes: number;
    clientName: string;
    comments: Comment[];
    likes_list: Like[];
}
export default News;
//# sourceMappingURL=New.model.d.ts.map