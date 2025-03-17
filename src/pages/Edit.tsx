import Header from '../components/Header';
import Button from '../components/Button';
import Editor from '../components/Editor';
import { useStateContext } from '../hooks/useStateContext';
import { useNavigate, useParams } from 'react-router-dom';
import useDiary from '../hooks/useDiary';

const Edit = () => {
  const { onUpdate, onDelete } = useStateContext();
  const nav = useNavigate();
  const { id } = useParams();
  const diaryId = Number(id);
  const currentDiary = useDiary(diaryId);

  const onClickUpdate = (content: string, emotionId: number) => {
    if (id) {
      onUpdate(content, emotionId, diaryId);
    }
  };

  const onClickDelete = () => {
    if (window.confirm('일기를 정말 삭제할까요? 다시 복구되지 않아요!')) {
      onDelete(diaryId);
      nav('/', { replace: true });
    }
  };

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
      <Editor onSubmit={onClickUpdate} data={currentDiary} />
    </>
  );
};

export default Edit;
