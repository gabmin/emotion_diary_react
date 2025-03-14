import './App.css';
import Home from './pages/Home';
import New from './pages/New';
import Dairy from './pages/Dairy';
import NotFound from './pages/NotFound';
import Edit from './pages/Edit';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Button from './components/button';
import { useReducer } from 'react';
import { DairyType } from './types/daiaryType';

const onClickPrev = () => {
  console.log('prev');
};
const onClicknext = () => {
  console.log('next');
};

const reducer = (state: DairyType[], action: any) => {
  return state;
};

function App() {
  const [data, dispatch] = useReducer(reducer, []);
  return (
    <>
      <Header
        title={'header'}
        leftChild={<Button text={'<'} onclick={onClickPrev} />}
        rightChild={<Button text={'>'} onclick={onClicknext} />}
      ></Header>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/new" element={<New />}></Route>
        <Route path="/dairy/:id" element={<Dairy />}></Route>
        <Route path="/edit/:id" element={<Edit />}></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </>
  );
}

export default App;
