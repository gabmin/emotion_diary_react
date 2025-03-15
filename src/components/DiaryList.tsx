import Button from './Button';
import { useNavigate } from 'react-router-dom';
import './DiaryList.css';
import DiaryItem from './DiaryItem';
import { DiaryType } from '../types/diaryType';

const DiartList = ({ filteredData }: { filteredData: DiaryType[] }) => {
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
        {filteredData.map((item) => {
          return <DiaryItem key={item.id} diary={item} />;
        })}
      </div>
    </div>
  );
};

export default DiartList;
