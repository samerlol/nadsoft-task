// loggingMiddleware.js

import logger from '../logger';

const loggingMiddleware = (req, res, next) => {
    const start = Date.now();
    const { method, url, query, body, user, ip } = req;
    const separator = '-'.repeat(50);

    logger.info(`\n${separator}`);
    logger.info(`Request received: ${method} ${url}`);
    logger.info(`Device IP: ${ip}`);

    res.on('finish', () => {
        const end = Date.now();
        const duration = end - start;
        const { statusCode, statusMessage } = res;

        logger.info(`Response sent: ${method} ${url} - ${statusCode} ${statusMessage}`);
        logger.debug('Response body:', res.locals.data);
        logger.info(`Request duration: ${duration}ms`);
        logger.info(separator);
    });

    res.on('error', (err) => {
        const end = Date.now();
        const duration = end - start;
        logger.error(`Request error: ${method} ${url} - ${err.message}`);
        logger.info(`Request duration: ${duration}ms`);
        logger.info(separator);
    });

    next();
};
export default loggingMiddleware;