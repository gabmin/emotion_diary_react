import './diaryItem.css';
import { getEmotionImage } from '../utils/emotionImage';
import Button from './Button';
import { DiaryType } from '../types/diaryType';

const DiaryItem = ({ diary }: { diary: DiaryType }) => {
  return (
    <div className="diary-item">
      <div className={`imgimg-section-section img-section_${diary.emtionId}`}>
        <img src={getEmotionImage(diary.emtionId)}></img>
      </div>
      <div className="info-section">
        <div className="created-date"></div>
        <div className="content"></div>
      </div>
      <div className="button-section">
        <Button text={'수정하기'}></Button>
      </div>
    </div>
  );
};

export default DiaryItem;
