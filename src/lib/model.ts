export enum UserRole {
  ADMINISTRATOR = "ADMINISTRATOR",
  EDITOR = "EDITOR",
}

export enum UserStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}

export enum NoticeCategory {
  EVENTS = "EVENTS",
  EDUCATION = "EDUCATION",
  SPORTS = "SPORTS",
  PARTNERSHIPS = "PARTNERSHIPS",
  INSTITUTIONAL = "INSTITUTIONAL",
}

export enum NoticeStatus {
  DRAFT = "DRAFT",
  PUBLISHED = "PUBLISHED",
  SCHEDULED = "SCHEDULED",
}

export enum EventCategory {
  WORKSHOP = "WORKSHOP",
  LECTURE = "LECTURE",
  COURSE = "COURSE",
  SPORT = "SPORT",
  COMMUNITY = "COMMUNITY",
  ART = "ART",
}

export enum TestimonialStatus {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
}

interface Base {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date | null;
}

export interface Storage extends Base {
  url: string;
  name: string;
  mimetype: string;
  key: string;
}

export interface User extends Base {
  avatar: Storage | null;
  avatar_id: string | null;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  status: UserStatus;
}

// antes da mudança de schema
// export interface Notice extends Base {
//   title: string;
//   category: NoticeCategory;
//   status: NoticeStatus;
//   resume: string;
//   content: string;
//   cover: string | null;
//   tags: string[];
// }

export interface Notice extends Base {
  cover: Storage | null;
  cover_id: string | null;
  title: string;
  category: NoticeCategory;
  status: NoticeStatus;
  resume: string;
  content: string;
  tags: string[];
}

export interface Events extends Base {
  title: string;
  date: string;
  hour: string; // Format: "HH:MM - HH:MM" (e.g., "14:00 - 18:00")
  location: string;
  address: string;
  category: EventCategory;
  capacity: number;
  description: string;
  detailedContent: string; // Can contain HTML
  cover: string | null;
}

export interface Podcast extends Base {
  title: string;
  date: string;
  duration: string;
  presenters: string[];
  guests: string[];
  description: string;
  cover: string | null;
  content: string | null;
}

export interface Video extends Base {
  title: string;
  date: string;
  duration: string;
  instructor: string;
  views: number; // TODO: tem que adicionar isso no back
  url: string;
  description: string;
  thumbnail: string | null;
}

export interface Album extends Base {
  title: string;
  date: string;
  description: string;
  cover: string | null;
  images: string[];
  imageCount: number; // TODO: adicionar isso no back
}

export interface Testimonial extends Base {
  avatar: Storage | null;
  avatar_id: string | null;
  name: string;
  position: string;
  rating: string;
  testimonial: string;
  status: TestimonialStatus;
}

interface Meta {
  total: number;
  page: number;
  perPage: number;
  currentPage: number | null;
  lastPage: number;
  firstPage: number;
  lastPageUrl: string | null;
  firstPageUrl: string | null;
  nextPageUrl: string | null;
  previousPageUrl: string | null;
}

export interface Paginated<Entity> {
  data: Entity;
  meta: Meta;
}

export interface PaginateMetaResponse<T> {
  data: T;
  meta: {
    total: number;
    per_page: number;
    page: number;
    last_page: number;
    first_page: number;
  };
}

export interface PaginateMetaQuery {
  page: number;
  per_page: number;
  search?: string;
}

export interface PaginateQuerySearch {
  page: number;
  per_page: number;
  search?: string;
}

// export type Payload<T extends Base> = Omit<T, 'createdAt' | 'updatedAt'>
