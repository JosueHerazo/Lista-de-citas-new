import { Model } from "sequelize-typescript";
import News from "./New.model";
export declare class Comment extends Model {
    text: string;
    userName: string;
    newsId: number;
    news: News;
}
export default Comment;
//# sourceMappingURL=Comment.model.d.ts.map