import { Request, Response } from 'express';
export declare const getNews: (_req: Request, res: Response) => Promise<void>;
export declare const createNews: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const addComment: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const toggleLike: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=news.d.ts.map