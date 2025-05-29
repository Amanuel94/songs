import { type NextFunction, type Request, type Response } from 'express'

const errorHandler = (error: any, req: Request, res: Response, next: NextFunction) => {
  const { statusCode = 500, message = 'Internal server error', ...rest } = error || {}
  res.status(statusCode).json({
    message: message || 'An error occurred',
    ...rest,
  })
}

export default errorHandler
