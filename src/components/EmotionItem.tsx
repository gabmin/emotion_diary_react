import './EmotionItem.css';
import { getEmotionImage } from '../utils/emotionImage';

const EmotionItem = ({
  emotionId,
  emotionName,
  isSelected,
  onclick,
}: {
  emotionId: number;
  emotionName: string;
  isSelected: boolean;
  onclick?: () => void;
}) => {
  return (
    <div
      className={`emotion-item ${isSelected ? `emotion-on-${emotionId}` : ''}`}
      onClick={onclick}
    >
      <div className="emotion-img">
        <img src={getEmotionImage(emotionId)} />
      </div>
      <div className="emotion-name">{emotionName}</div>
    </div>
  );
};

export default EmotionItem;
