export interface DiaryType {
  id: number;
  createdDate?: number | Date;
  emotionId?: number;
  content?: string;
}

export interface reducerDiaryType {
  type: string;
  data: DiaryType;
}

export interface dispatchType {
  onCreate: (content: string, emotionId: number, createdDate: Date) => void;
  onUpdate: (content: string, id: number, emotionId: number) => void;
  onDelete: (id: number) => void;
}
