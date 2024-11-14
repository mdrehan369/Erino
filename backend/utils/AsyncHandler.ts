import { NextFunction, Request, Response } from 'express'
import { ApiError } from './ApiError'

const asyncHandler = (
    requestHandler: (
        req: Request,
        res: Response,
        next: NextFunction
    ) => Promise<any>
) => {
    return (req: Request, res: Response, next: NextFunction): void => {
        Promise.resolve(requestHandler(req, res, next)).catch(
            (err: ApiError | any) => {
                // err.name == 'ZodError'
                //     ? res
                //           .status(err.statusCode <= 500 ? err.statusCode : 500)
                //           .json({ ...err, message: err.issues })
                //     : console.log(err);
                //     res.status(err.statusCode <= 500 ? err.statusCode : 500).json({
                //     ...err,
                //     message: err.message,
                // })
                console.log(err)
                return res
                    .status(err.statusCode <= 500 ? err.statusCode : 500)
                    .json({
                        ...err,
                        message: err.message,
                    })
            }
        )
    }
}

export { asyncHandler }
