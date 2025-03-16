import './Viewer.css';
import { getEmotionImage } from '../utils/emotionImage';
import { emotionList } from '../utils/constants';
import { DiaryType } from '../types/diaryType';

const Viewer = ({ data }: { data: DiaryType }) => {
  const emotionItem = emotionList.find((item) => item.emotionId === data.id);

  return (
    <div className="viewer">
      <section className="img-section">
        <h4>오늘의 감정</h4>
        <div className={`emotion-img-wrapper emotion-img-${data.emotionId}`}>
          <img src={getEmotionImage(data.emotionId)} />
          <div>{emotionItem?.emotionName}</div>
        </div>
      </section>
      <section className="content-section">
        <h4>오늘의 일기</h4>
        <div className="content-wrapper">
          <p>{data.content}</p>
        </div>
      </section>
    </div>
  );
};

export default Viewer;
