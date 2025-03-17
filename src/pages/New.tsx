import Header from '../components/Header';
import Button from '../components/Button';
import Editor from '../components/Editor';
import { useNavigate } from 'react-router-dom';
import { useStateContext } from '../hooks/useStateContext';

const New = () => {
  const nav = useNavigate();
  const { onCreate } = useStateContext();

  const onClickCreate = (
    content: string,
    emotionId: number,
    createdDate: Date,
  ) => {
    onCreate(content, emotionId, createdDate);
  };

  return (
    <>
      <Header
        title={'새 일기 쓰기'}
        leftChild={<Button text="< 뒤로가기" onclick={() => nav(-1)}></Button>}
      ></Header>
      <Editor onSubmit={onClickCreate} />
    </>
  );
};

export default New;
