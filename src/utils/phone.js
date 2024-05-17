import parsePhoneNumber from 'libphonenumber-js';
import logger from '../logger';

export const getInternationalPhoneNumber = ({ phoneNumber }) => {
    try {
        const format = phoneNumber.includes('+') ? phoneNumber : `+${phoneNumber}`;
        return parsePhoneNumber(format).formatInternational();
    } catch (error) {
        logger.error(error);
    }
};

export const isInternationalNumber = (phoneNumber) => {
    try {
        const format = phoneNumber.includes('+') ? phoneNumber : `+${phoneNumber}`;
        return parsePhoneNumber(format).isValid();
    } catch (error) {
        return false;
    }
};

