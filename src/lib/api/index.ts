import { Authentication } from "./autenticacao";
import { Storage } from "./storage";
import { User } from "./usuario";

export const API_SERVICE = {
  AUTHENTICATION: Authentication,
  STORAGE: Storage,
  USER: User,
} as const;
