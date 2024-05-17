import * as yup from "yup";

import { isInternationalNumber } from '../utils/phone';
import { isCountry } from "../utils/country";

export const userSchema = {
    create: yup.object({
        body: yup.object({
            name: yup.string(),
            email: yup.string().email().required(),
            age: yup.number().required(),
            country: yup.string().test('test-country', 'Provide a valid country', function (value) {
                const { path, createError } = this;
                return isCountry(value) || createError({ path, message: `${value} is not a country` });
            }).required(),
            mobile: yup.string().test('test-international-number', 'Provide an international phone number', function (value) {
                const { path, createError } = this;
                return isInternationalNumber(value) || createError({ path, message: "Mobile phone is not a number" });
            }).required(),
        }),
    }),
    findOne: yup.object({
        params: yup.object({
            id: yup.number().required(),
        }),
    }),
    findAll: yup.object({

    }),
    update: yup.object({
        params: yup.object({
            id: yup.number().required(),
        }),
    }),
    delete: yup.object({
        params: yup.object({
            id: yup.number().required(),
        }),
    })
};
