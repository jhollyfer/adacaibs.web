import { NoticeCategory, NoticeStatus } from "./model";

interface Option<T> {
  label: string;
  value: T;
}

export const NOTICE_CATEGORY_LIST: Option<NoticeCategory>[] = [
  {
    label: "Eventos",
    value: NoticeCategory.EVENTS,
  },
  {
    label: "Educação",
    value: NoticeCategory.EDUCATION,
  },
  {
    label: "Esportes",
    value: NoticeCategory.SPORTS,
  },
  {
    label: "Parcerias",
    value: NoticeCategory.PARTNERSHIPS,
  },
  {
    label: "Institucional",
    value: NoticeCategory.INSTITUTIONAL,
  },
];

export const NOTICE_STATUS_LIST: Option<NoticeStatus>[] = [
  {
    label: "Rascunho",
    value: NoticeStatus.DRAFT,
  },
  {
    label: "Publicado",
    value: NoticeStatus.PUBLISHED,
  },
  {
    label: "Agendado",
    value: NoticeStatus.SCHEDULED,
  },
];

export const QUERY = {
  USER_PAGINATE: "USER_PAGINATE",
  USER_SHOW: "USER_SHOW",
} as const;
