import { css } from '@emotion/react';
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
      css={css`
        display: flex;
        flex-direction: column;
        background-color: rgb(236, 236, 236);
        padding: 20px;
        border-radius: 5px;
        cursor: pointer;
        text-align: center;
        &.emotion-on-1 {
          color: white;
          background-color: rgb(100, 201, 100);
        }
        &.emotion-on-2 {
          color: white;
          background-color: rgb(157, 215, 114);
        }
        &.emotion-on-3 {
          color: white;
          background-color: rgb(253, 206, 23);
        }
        &.emotion-on-4 {
          color: white;
          background-color: rgb(253, 132, 70);
        }
        &.emotion-on-5 {
          color: white;
          background-color: rgb(253, 86, 95);
        }
      `}
      onClick={onclick}
    >
      <div
        css={css`
          display: flex;
          justify-content: center;
          margin-bottom: 10px;
        `}
      >
        <img
          css={css`
            width: 50%;
          `}
          src={getEmotionImage(emotionId)}
        />
      </div>
      <div>{emotionName}</div>
    </div>
  );
};

export default EmotionItem;
