import { useEffect, useState } from 'react';
import './Editor.css';
import EmotionItem from './EmotionItem';
import Button from './Button';
import { useNavigate } from 'react-router-dom';
import { DiaryType } from '../types/diaryType';

const emotionList = [
  {
    emotionId: 1,
    emotionName: '완전 좋음',
  },
  {
    emotionId: 2,
    emotionName: '좋음',
  },
  {
    emotionId: 3,
    emotionName: '그럭저럭',
  },
  {
    emotionId: 4,
    emotionName: '나쁨',
  },
  {
    emotionId: 5,
    emotionName: '끔찍함',
  },
];

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

  const getStringedDate = (targetDate: Date) => {
    let year: string | number = targetDate.getFullYear();
    let month: string | number = targetDate.getMonth() + 1;
    let date: string | number = targetDate.getDate();

    if (month < 10) {
      month = `0${month}`;
    }

    if (date < 10) {
      date = `0${date}`;
    }

    return `${year}-${month}-${date}`;
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
    <div className="editor">
      <section className="date-section">
        <h4>오늘의 날짜</h4>
        <input
          name="createdDate"
          type="date"
          value={getStringedDate(input.createdDate)}
          onChange={onChangeInput}
        />
      </section>
      <section className="emotion-section">
        <h4>오늘의 감정</h4>
        <div className="emotion-list-wrapper">
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
          name="content"
          value={input.content}
          onChange={onChangeInput}
        ></textarea>
      </section>
      <section className="button-section">
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
