import parsePhoneNumber from 'libphonenumber-js';

export const getInternationalPhoneNumber = ({ phoneNumber }) => {
    try {
        console.log({ phoneNumber });
        const format = phoneNumber.includes('+') ? phoneNumber : `+${phoneNumber}`;
        return parsePhoneNumber(format).formatInternational();
    } catch (error) {
        console.log(error);
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
// module.exports = {
//     getInternationalPhoneNumber,
//     isInternationalNumber
// };
