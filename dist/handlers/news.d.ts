import { Request, Response } from 'express';
export declare const getNews: (req: any, res: any) => Promise<void>;
export declare const createNews: (req: Request, res: Response) => Promise<any>;
export declare const addComment: (req: Request, res: Response) => Promise<any>;
export declare const toggleLike: (req: Request, res: Response) => Promise<any>;
