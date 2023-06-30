import allowedOrigins from "./allowedOrigins.ts";
import { CorsOptions } from 'cors';

const corsOptions: CorsOptions = {
  origin: (origin: string | undefined, callback: (error: Error | null, success?: boolean) => void) => {
    if (allowedOrigins.indexOf(origin || "") !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS."), false);
    }
  },
  optionsSuccessStatus: 200,
};

export default corsOptions;