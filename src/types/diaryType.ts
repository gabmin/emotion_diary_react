export interface DiaryType {
  id: number;
  createdDate?: number;
  emtionId?: number;
  content?: string;
}

export interface reducerDiaryType {
  type: string;
  data: DiaryType;
}
