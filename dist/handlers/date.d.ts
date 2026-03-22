import { Request, Response } from "express";
export declare const getProducts: (req: Request, res: Response) => Promise<void>;
<<<<<<< HEAD
export declare const createProduct: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getBarberAvailability: (req: Request, res: Response) => Promise<void>;
export declare const deleteProduct: (req: Request, res: Response) => Promise<void>;
export declare const getProductById: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const updateAvailability: (req: Request, res: Response) => Promise<void>;
export declare const UpdateProduct: (req: Request, res: Response) => Promise<void>;
//# sourceMappingURL=date.d.ts.map
=======
export declare const createProduct: (req: Request, res: Response) => Promise<void>;
export declare const deleteProduct: (req: Request, res: Response) => Promise<void>;
export declare const getProductById: (req: Request, res: Response) => Promise<void>;
export declare const updateAppointmentStatus: (req: any, res: any) => Promise<void>;
export declare const UpdateProduct: (req: Request, res: Response) => Promise<void>;
>>>>>>> c6d54f15bc335c99e7da8a36440131c346d8cd45
