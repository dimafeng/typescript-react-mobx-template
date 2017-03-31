export class Config {
    static BASE_URL = process.env.NODE_ENV === 'development' ? 'http://localhost:3004' : '';
}