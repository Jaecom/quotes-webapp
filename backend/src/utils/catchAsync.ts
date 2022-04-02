import { Response, Request, NextFunction, RequestHandler } from "express";

//define type later
interface AsyncRequestHandler {
	(req: Request<any, any, any, any>, res: Response<any>, next: NextFunction): any;
}

const catchAsync = (func: AsyncRequestHandler) => {
	return (req: Request, res: Response, next: NextFunction) => {
		func(req, res, next).catch(next);
	};
};

export default catchAsync;
