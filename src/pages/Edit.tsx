import Header from '../components/Header';
import Button from '../components/Button';
import Editor from '../components/Editor';
import { useNavigate } from 'react-router-dom';
import { DiaryDispatchContext, DiaryStateContext } from '../App';
import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { DiaryType } from '../types/diaryType';

const Edit = () => {
  const nav = useNavigate();
  const { id } = useParams();
  const diaryId = Number(id);
  const data = useContext(DiaryDispatchContext);
  const diary = useContext(DiaryStateContext);

  const [currentDiaryItem, setCurrentDiaryItem] = useState<DiaryType>(
    {} as DiaryType,
  );

  const onClickUpdate = (content: string, emotionId: number) => {
    if (id) {
      data.onUpdate(content, emotionId, diaryId);
    }
  };

  const onClickDelete = () => {
    if (window.confirm('일기를 정말 삭제할까요? 다시 복구되지 않아요!')) {
      data.onDelete(diaryId);
      nav('/', { replace: true });
    }
  };

  useEffect(() => {
    const targetDiary = diary.find((item) => item.id === diaryId);
    if (!targetDiary) {
      window.alert('존재하지 않는 일기입니다.');
      nav('/', { replace: true });
      return;
    }
    setCurrentDiaryItem(targetDiary);
  }, [diaryId]);

  return (
    <>
      <Header
        title={'일기 수정하기'}
        leftChild={<Button text="< 뒤로가기" onclick={() => nav(-1)}></Button>}
        rightChild={
          <Button
            text="삭제하기"
            type={'NEGATIVE'}
            onclick={onClickDelete}
          ></Button>
        }
      ></Header>
      <Editor onSubmit={onClickUpdate} data={currentDiaryItem} />
    </>
  );
};

export default Edit;
