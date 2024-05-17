

// Environment
export const ENV = process.env.NODE_ENV || "development";

// Database Credentials
export const DATABASE = {
    dialect: process.env.DB_DIALECT,
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    define: {
        timestamps: true,
    },
};

// Port
export const SERVER_PORT = process.env.SERVER_PORT || 3000;


// JWT Credentials
export const JWT_SECRET = process.env.JWT_SECRET;

