import Button from './button';
import { useNavigate } from 'react-router-dom';
import './DiaryList.css';
import DiaryItem from './DiaryItem';

const DiartList = () => {
  return (
    <div className="diary-list">
      <div className="menu-bar">
        <select>
          <option value={'latest'}>최신순</option>
          <option value={'oldest'}>오래된 순</option>
        </select>
        <Button text={'새 일기 쓰기'} type={'POSITIVE'}></Button>
      </div>
      <div className="list_wrapper">
        <DiaryItem />
      </div>
    </div>
  );
};

export default DiartList;
