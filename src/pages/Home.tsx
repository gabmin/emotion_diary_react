import Header from '../components/Header';
import Button from '../components/button';

const onClickPrev = () => {
  console.log('prev');
};
const onClicknext = () => {
  console.log('next');
};

const Home = () => {
  return (
    <>
      <Header
        title={'header'}
        leftChild={<Button text={'<'} onclick={onClickPrev} />}
        rightChild={<Button text={'>'} onclick={onClicknext} />}
      ></Header>
    </>
  );
};

export default Home;
