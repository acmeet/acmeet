import dotenv from 'dotenv';

dotenv.config();

export const config = {
  port: Number(process.env.PORT) || 8080,
  __prod__: process.env.NODE_ENV === 'production',
};