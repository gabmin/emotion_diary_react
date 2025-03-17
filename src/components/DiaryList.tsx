import Button from './Button';
import { useNavigate } from 'react-router-dom';
import DiaryItem from './DiaryItem';
import { DiaryType } from '../types/diaryType';
import { ChangeEvent, useState } from 'react';
import { css } from '@emotion/react';

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
          return Number(a.createdDate) - Number(b.createdDate);
        }
        return Number(b.createdDate) - Number(a.createdDate);
      }
      return 0;
    });
  };

  return (
    <>
      <div
        css={css`
          margin: 20px 0;
          display: flex;
          gap: 10px;
          button {
            flex: 1;
          }
        `}
      >
        <select
          css={css`
            background-color: rgb(236, 236, 236);
            border: none;
            border-radius: 5px;
            cursor: pointer;
            padding: 10px 20px;
            font-size: 18px;
          `}
          value={sortType}
          onChange={onChangeSortType}
        >
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
    </>
  );
};

export default DiartList;
