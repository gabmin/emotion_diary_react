import Header from '../components/Header';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Viewer from '../components/Viewer';
import useDiary from '../hooks/useDiary';
import { getStringedDate } from '../utils/dateFormatter';

const Dairy = () => {
  const nav = useNavigate();
  const params = useParams();
  const id = Number(params.id);
  const currentDiary = useDiary(id);
  const title = () => {
    if (currentDiary.createdDate)
      return getStringedDate(new Date(currentDiary.createdDate));
    return '';
  };

  return (
    <>
      <Header
        title={`${title()} 기록`}
        leftChild={<Button text="< 뒤로가기" onclick={() => nav(-1)}></Button>}
        rightChild={
          <Button
            text="수정하기"
            onclick={() => nav(`/edit/${params.id}`)}
          ></Button>
        }
      ></Header>
      <Viewer data={currentDiary} />
    </>
  );
};

export default Dairy;
