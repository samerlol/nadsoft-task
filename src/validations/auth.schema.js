import * as yup from "yup";

export const authSchema = {
    login: yup.object({
        body: yup.object({
            email: yup.string().email().required(),
        }),
    }),
    
};
