import { getEmotionImage } from '../utils/emotionImage';
import { emotionList } from '../utils/constants';
import { DiaryType } from '../types/diaryType';
import { css } from '@emotion/react';

const Viewer = ({ data }: { data: DiaryType }) => {
  const emotionItem = emotionList.find((item) => item.emotionId === data.id);

  return (
    <div
      css={css`
        section {
          width: 100%;
          margin-bottom: 100px;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }
      `}
    >
      <section>
        <h4>오늘의 감정</h4>
        <div
          className={`emotion-img-${data.emotionId}`}
          css={css`
            width: 250px;
            height: 250px;
            border-radius: 5px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            color: #fff;
            font-size: 25px;
            &.emotion-img-1 {
              color: white;
              background-color: rgb(100, 201, 100);
            }
            &.emotion-img-2 {
              color: white;
              background-color: rgb(157, 215, 114);
            }
            &.emotion-img-3 {
              color: white;
              background-color: rgb(253, 206, 23);
            }
            &.emotion-img-4 {
              color: white;
              background-color: rgb(253, 132, 70);
            }
            &.emotion-img-5 {
              color: white;
              background-color: rgb(253, 86, 95);
            }
          `}
        >
          <img src={getEmotionImage(data.emotionId)} />
          <div>{emotionItem?.emotionName}</div>
        </div>
      </section>
      <section>
        <h4>오늘의 일기</h4>
        <div
          css={css`
            width: 100%;
            background-color: rgb(236, 236, 236);
            border-radius: 5px;
            word-break: keep-all;
            overflow-wrap: break-word;
          `}
        >
          <p
            css={css`
              padding: 20px;
              text-align: center;
              font-size: 20px;
              font-weight: 400;
              line-height: 2.5;
            `}
          >
            {data.content}
          </p>
        </div>
      </section>
    </div>
  );
};

export default Viewer;
