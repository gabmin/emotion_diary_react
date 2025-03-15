import './diaryItem.css';
import { getEmotionImage } from '../utils/emotionImage';
import Button from './Button';
import { DiaryType } from '../types/diaryType';
import { useNavigate } from 'react-router-dom';

const DiaryItem = ({ diary }: { diary: DiaryType }) => {
  const nav = useNavigate();

  return (
    <div className="diary-item">
      <div
        onClick={() => nav(`/diary/${diary.id}`)}
        className={`img-section img-section_${diary.emotionId}`}
      >
        <img src={getEmotionImage(diary.emotionId)}></img>
      </div>
      <div onClick={() => nav(`/diary/${diary.id}`)} className="info-section">
        <div className="created-date">
          {diary.createdDate ? new Date(diary.createdDate).toDateString() : ''}
        </div>
        <div className="content">{diary.content}</div>
      </div>
      <div className="button-section">
        <Button
          text={'수정하기'}
          onclick={() => nav(`/edit/${diary.id}`)}
        ></Button>
      </div>
    </div>
  );
};

export default DiaryItem;
