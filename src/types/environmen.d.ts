export {}

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT?: number
      BACKEND_CORS_ORIGINS?: string
      POSTGRES_HOSTNAME: string
      POSTGRES_PORT?: number
      POSTGRES_PASSWORD: string
      POSTGRES_USER: string
      POSTGRES_DB: string
    }
  }
}
