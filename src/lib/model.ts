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
  avatarId: string | null;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  status: UserStatus;
}

export interface Notice extends Base {
  title: string;
  category: NoticeCategory;
  status: NoticeStatus;
  resume: string;
  content: string;
  tags: string[];

  cover: Storage | null;
  coverId: string | null;
}

export interface Events extends Base {
  title: string;
  date: string;
  hour: string;
  location: string;
  address: string;
  category: EventCategory;
  capacity: number;
  resume: string;
  content: string;

  cover: Storage | null;
  coverId: string | null;
}

export interface Podcast extends Base {
  title: string;
  date: string;
  duration: string;
  presenters: string[];
  guests: string[];
  description: string;
  content: string | null;

  cover: Storage | null;
  coverId: string | null;
}

export interface Video extends Base {
  title: string;
  date: string;
  duration: string;
  instructor: string;
  views: number;
  url: string;
  description: string;

  cover: Storage | null;
  coverId: string | null;
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
  name: string;
  position: string;
  rating: string;
  testimonial: string;
  status: TestimonialStatus;

  avatar: Storage | null;
  avatarId: string | null;
}

export interface Meta {
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

export interface PaginateMetaResponse<T> {
  data: T;
  meta: Meta;
}

export interface PaginateMetaQuery {
  page: number;
  perPage: number;
  search?: string;
}
