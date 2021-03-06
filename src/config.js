import { config } from 'dotenv';
config();

export const NODE_ENV = process.env.NODE_ENV || 'development';
export const PORT = process.env.PORT || 3000;

// Credenciales Base de datos
export const DB_HOST = process.env.DB_HOST || "localhost";
export const DB_USER = process.env.DB_USER || "root";
export const DB_PASSWORD = process.env.DB_PASSWORD || "";
export const DB_DATABASE = process.env.DB_DATABASE || "todorutas";
export const DB_PORT = process.env.DB_PORT || 3306;

export const API_KEY_GOOGLE = process.env.API_KEY;