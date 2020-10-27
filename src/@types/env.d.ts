declare global {
    namespace NodeJS {
        interface ProcessEnv {
            DATABASE_HOST: string;
            DATABASE_USERNAME: string;
            DATABASE_PASSWORD: string;
            JWT_ACESS: string;
            API_KEY_EMAIL: string;
            SITE_BASE_URL: string;
            EMAIL: string;
        }
    }
}

export{}