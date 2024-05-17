import { Request, Response, NextFunction } from 'express';
import { IsApiError, ApiError } from '../utils/ApiError';
import { ENV } from '../config';
import { envEnums } from '../enums/env.enum';
import logger from '../logger';

/**
 * Global error handler for all routes
 * @param {ApiError} err
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export default (err, _req, res, next) => {
  if (res.headersSent) return next(err);
  if (IsApiError(err)) return res.status(err.statusCode).send(err.message);
  if (ENV === envEnums.DEVELOPMENT) {
    logger.error(err);
    return res.status(500).send(err.message);
  }
  logger.error(err);
  return res.status(500).send('Something went wrong');
};
