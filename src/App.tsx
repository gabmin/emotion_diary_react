import Home from './pages/Home';
import New from './pages/New';
import Dairy from './pages/Diary';
import NotFound from './pages/NotFound';
import Edit from './pages/Edit';
import { Route, Routes } from 'react-router-dom';
import { css, Global } from '@emotion/react';
import {
  useStateContext,
  StateProvider as StateProvider,
} from './hooks/useStateContext';

function App() {
  const { isLoading } = useStateContext();
  if (isLoading) {
    return <div>로딩중입니다.</div>;
  }

  return (
    <StateProvider>
      <Global
        styles={css`
          body {
            margin: 0px;
            width: 100%;
            background-color: rgb(246, 246, 246);
            display: flex;
          }
          @font-face {
            font-family: 'NanumPenscript';
            src: url('../public/NanumPenScript-Regular.ttf');
          }
          * {
            font-family: 'NanumPenscript';
          }
          #root {
            background-color: white;
            max-width: 600px;
            width: 100%;
            margin: 0 auto;
            min-height: 100vh;
            height: 100%;
            box-shadow: rgba(100, 100, 100, 0.2) 0 0 29 0;
            padding: 0 20px;
          }
          h4 {
            font-size: 22px;
            font-weight: bold;
          }
        `}
      />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/new" element={<New />}></Route>
        <Route path="/diary/:id" element={<Dairy />}></Route>
        <Route path="/edit/:id" element={<Edit />}></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </StateProvider>
  );
}

export default App;
