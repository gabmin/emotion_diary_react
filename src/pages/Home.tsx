import Header from '../components/Header';
import Button from '../components/Button';
import DiaryList from '../components/DiaryList';
import { useState } from 'react';
import { useStateContext } from '../hooks/useStateContext';
import { DiaryType } from '../types/diaryType';

const Home = () => {
  const { data } = useStateContext();

  const [pivotDate, setPivotDate] = useState(new Date());

  const filterdData = (pivotDate: Date, data: DiaryType[]) => {
    const beginTime = new Date(
      pivotDate.getFullYear(),
      pivotDate.getMonth(),
      1,
      0,
      0,
      0,
    ).getTime();

    const endTime = new Date(
      pivotDate.getFullYear(),
      pivotDate.getMonth() + 1,
      0,
      23,
      59,
      59,
    ).getTime();

    return data.filter((item) => {
      if (item.createdDate) {
        const date = new Date(item.createdDate).getTime();
        return beginTime <= date && date <= endTime;
      }
      return [];
    });
  };

  const onClickPrev = () => {
    setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth() - 1));
  };
  const onClickNext = () => {
    setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth() + 1));
  };

  return (
    <>
      <Header
        title={`${pivotDate.getFullYear()}년 ${pivotDate.getMonth() + 1}월`}
        leftChild={<Button text={'<'} onclick={onClickPrev} />}
        rightChild={<Button text={'>'} onclick={onClickNext} />}
      ></Header>
      <DiaryList filteredData={filterdData(pivotDate, data)} />
    </>
  );
};

export default Home;
