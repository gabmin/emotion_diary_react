import Button from './Button';
import { useNavigate } from 'react-router-dom';
import './DiaryList.css';
import DiaryItem from './DiaryItem';
import { DiaryType } from '../types/diaryType';
import { ChangeEvent, useState } from 'react';

const DiartList = ({ filteredData }: { filteredData: DiaryType[] }) => {
  const nav = useNavigate();

  const [sortType, setSortType] = useState('lastest');

  const onChangeSortType = (e: ChangeEvent<HTMLSelectElement>) => {
    setSortType(e.target.value);
  };

  const getSortedData = () => {
    return filteredData.toSorted((a, b) => {
      if (a.createdDate && b.createdDate) {
        if (sortType === 'oldest') {
          return a.createdDate - b.createdDate;
        }
        return b.createdDate - a.createdDate;
      }
      return 0;
    });
  };

  return (
    <div className="diary-list">
      <div className="menu-bar">
        <select value={sortType} onChange={onChangeSortType}>
          <option value={'latest'}>최신순</option>
          <option value={'oldest'}>오래된 순</option>
        </select>
        <Button
          text={'새 일기 쓰기'}
          type={'POSITIVE'}
          onclick={() => nav('/new')}
        ></Button>
      </div>
      <div className="list_wrapper">
        {getSortedData().map((item) => {
          return <DiaryItem key={item.id} diary={item} />;
        })}
      </div>
    </div>
  );
};

export default DiartList;
