export const getStoredCookie = (cookies, key) => {
    const cookieArray = cookies.split('; ');
    const cookieObject = cookieArray.reduce((acc, cookie) => {
        const [key, value] = cookie.split('=');
        acc[key] = value;
        return acc;
    }, {});
    const value = cookieObject[key] || null;
    return value;
};
