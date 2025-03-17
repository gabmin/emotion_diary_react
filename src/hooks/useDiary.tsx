import { useEffect, useState } from 'react';
import { DiaryType } from '../types/diaryType';
import { useNavigate } from 'react-router-dom';
import { useStateContext } from './useStateContext';

const useDiary = (id: number) => {
  const { data } = useStateContext();
  const nav = useNavigate();

  const [currentDiaryItem, setCurrentDiaryItem] = useState<DiaryType>({
    id: 0,
    createdDate: new Date(),
    emotionId: 1,
    content: '',
  });

  useEffect(() => {
    const targetDiary = data.find((item) => item.id === id);
    if (!targetDiary) {
      window.alert('존재하지 않는 일기입니다.');
      nav('/', { replace: true });
      return;
    }
    setCurrentDiaryItem(targetDiary);
  }, [id]);

  return currentDiaryItem;
};

export default useDiary;
