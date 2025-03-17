import { useEffect, useState } from 'react';
import EmotionItem from './EmotionItem';
import Button from './Button';
import { useNavigate } from 'react-router-dom';
import { DiaryType } from '../types/diaryType';
import { emotionList } from '../utils/constants';
import { getStringedDate } from '../utils/dateFormatter';
import { css } from '@emotion/react';

const Editor = ({
  onSubmit,
  data,
}: {
  onSubmit: (
    content: string,
    emotionId: number,
    createdDate: Date,
    id?: number,
  ) => void;
  data?: DiaryType;
}) => {
  const nav = useNavigate();

  const [input, setInput] = useState({
    createdDate: new Date(),
    emotionId: 4,
    content: '',
  });

  const [selectedImage, setSelectedImage] = useState(1);

  useEffect(() => {
    if (data && Object.keys(data).length !== 0) {
      setInput({
        ...data,
        createdDate: new Date(Number(data.createdDate)),
        emotionId: data.emotionId ? data.emotionId : 1,
        content: data.content ? data.content : '',
      });
      setSelectedImage(data.emotionId ? data.emotionId : 1);
    }
  }, [data]);

  const onclickImage = (emotionId: number) => {
    setSelectedImage(emotionId);
    setInput({
      ...input,
      emotionId,
    });
  };

  const onChangeInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    let name = e.target.name;
    let value: Date | string = e.target.value;

    if (name === 'createdDate') {
      value = new Date(value);
    }

    setInput({
      ...input,
      [name]: value,
    });
  };

  const onClickSubmit = () => {
    onSubmit(input.content, input.emotionId, input.createdDate);
    nav('/', { replace: true });
  };

  return (
    <div
      css={css`
        section {
          margin-bottom: 40px;
        }
      `}
    >
      <section
        css={css`
          input,
          textarea {
            background-color: rgb(236, 236, 236);
            border: none;
            border-radius: 5px;
            font-size: 20px;
            padding: 10px 20px;
          }
        `}
      >
        <h4>오늘의 날짜</h4>
        <input
          css={css`
            background-color: rgb(236, 236, 236);
            border: none;
            border-radius: 5px;
            font-size: 20px;
            padding: 10px 20px;
          `}
          name="createdDate"
          type="date"
          value={getStringedDate(input.createdDate)}
          onChange={onChangeInput}
        />
      </section>
      <section className="emotion-section">
        <h4>오늘의 감정</h4>
        <div
          css={css`
            display: flex;
            justify-content: space-around;
            gap: 2%;
          `}
        >
          {emotionList.map((emotion) => (
            <EmotionItem
              key={emotion.emotionId}
              emotionId={emotion.emotionId}
              emotionName={emotion.emotionName}
              isSelected={selectedImage === emotion.emotionId}
              onclick={() => onclickImage(emotion.emotionId)}
            />
          ))}
        </div>
      </section>
      <section className="content-section">
        <h4>오늘의 일기</h4>
        <textarea
          css={css`
            padding: 20px;
            width: 100%;
            min-height: 200px;
            resize: vertical;
            box-sizing: border-box;
          `}
          name="content"
          value={input.content}
          onChange={onChangeInput}
        ></textarea>
      </section>
      <section
        css={css`
          display: flex;
          justify-content: space-between;
        `}
      >
        <Button text={'취소하기'} onclick={() => nav(-1)}></Button>
        <Button
          text={'작성완료'}
          type="POSITIVE"
          onclick={onClickSubmit}
        ></Button>
      </section>
    </div>
  );
};

export default Editor;
