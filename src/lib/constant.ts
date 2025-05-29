import { Meta, NoticeCategory, NoticeStatus } from "./model";

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

export const MetaBase: Meta = {
  page: 1,
  perPage: 10,
  currentPage: 1,
  firstPage: 1,
  lastPage: 1,
  firstPageUrl: null,
  lastPageUrl: null,
  nextPageUrl: null,
  previousPageUrl: null,
  total: 1,
};
