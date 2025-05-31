import { Album } from "./album";
import { Authentication } from "./autenticacao";
import { Dashboard } from "./dashboard";
import { Testimonial } from "./depoimentos";
import { Events } from "./eventos";
import { Notice } from "./noticias";
import { Podcast } from "./podcast";
import { Storage } from "./storage";
import { User } from "./usuarios";
import { Video } from "./videos";

export const API_SERVICE = {
  AUTHENTICATION: Authentication,
  STORAGE: Storage,
  USER: User,
  NOTICE: Notice,
  PODCAST: Podcast,
  VIDEO: Video,
  ALBUM: Album,
  EVENT: Events,
  TESTIMONIAL: Testimonial,
  DASHBOARD: Dashboard,
} as const;
