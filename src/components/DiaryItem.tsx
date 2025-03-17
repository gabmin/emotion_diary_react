import { getEmotionImage } from '../utils/emotionImage';
import Button from './Button';
import { DiaryType } from '../types/diaryType';
import { useNavigate } from 'react-router-dom';
import { css } from '@emotion/react';

const DiaryItem = ({ diary }: { diary: DiaryType }) => {
  const nav = useNavigate();

  return (
    <div
      css={css`
        display: flex;
        gap: 15px;
        justify-content: space-between;
        padding: 15px 0px;
        border-bottom: 1px solid rgb(236, 236, 236);
      `}
    >
      <div
        onClick={() => nav(`/diary/${diary.id}`)}
        className={`img-section_${diary.emotionId}`}
        css={css`
          min-width: 120px;
          height: 80px;
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
          border-radius: 5px;
          &.img-section_1 {
            background-color: rgb(100, 201, 100);
          }
          &.img-section_2 {
            background-color: rgb(157, 215, 114);
          }
          &.img-section_3 {
            background-color: rgb(253, 206, 23);
          }
          &.img-section_4 {
            background-color: rgb(253, 132, 70);
          }
          &.img-section_5 {
            background-color: rgb(253, 86, 95);
          }
        `}
      >
        <img
          css={css`
            width: 50%;
          `}
          src={getEmotionImage(diary.emotionId)}
        ></img>
      </div>
      <div
        css={css`
          flex: 1;
          cursor: pointer;
        `}
        onClick={() => nav(`/diary/${diary.id}`)}
      >
        <div
          css={css`
            font-weight: bold;
            font-size: 25px;
          `}
        >
          {diary.createdDate ? new Date(diary.createdDate).toDateString() : ''}
        </div>
        <div
          css={css`
            font-size: 18px;
          `}
        >
          {diary.content}
        </div>
      </div>
      <div
        css={css`
          min-width: 70px;
        `}
      >
        <Button
          text={'수정하기'}
          onclick={() => nav(`/edit/${diary.id}`)}
        ></Button>
      </div>
    </div>
  );
};

export default DiaryItem;
