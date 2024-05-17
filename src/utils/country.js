import lookup from 'country-code-lookup';

export const isCountry = (country) => {
    try {
        return !!lookup.byCountry(country);
    } catch (error) {
        return false;
    }
}

