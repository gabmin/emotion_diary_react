import Home from './pages/Home';
import New from './pages/New';
import Dairy from './pages/Diary';
import NotFound from './pages/NotFound';
import Edit from './pages/Edit';
import { Route, Routes } from 'react-router-dom';
import { useReducer, useRef, createContext, useEffect, useState } from 'react';
import { DiaryType, reducerDiaryType, dispatchType } from './types/diaryType';
import { css, Global } from '@emotion/react';

const isDiaryType = (data: DiaryType | DiaryType[]): data is DiaryType => {
  return (data as DiaryType).id !== undefined;
};

const reducer = (state: DiaryType[], action: reducerDiaryType) => {
  let nextState: DiaryType[] = [];

  switch (action.type) {
    case 'INIT':
      if (!isDiaryType(action.data)) {
        nextState = action.data;
      }
      break;
    case 'CREATE':
      nextState = isDiaryType(action.data) ? [action.data, ...state] : state;
      break;
    case 'UPDATE':
      nextState = state.map((diary) => {
        if (isDiaryType(action.data)) {
          return diary.id === action.data.id ? action.data : diary;
        }
        return diary;
      });
      break;
    case 'DELETE':
      nextState = state.filter((diary) => {
        if (isDiaryType(action.data)) {
          return diary.id !== action.data.id;
        }
      });
      break;
    default:
      return state;
  }

  localStorage.setItem('diary', JSON.stringify(state));
  return nextState;
};

export const DiaryStateContext = createContext<DiaryType[]>([]);
export const DiaryDispatchContext = createContext<dispatchType>(
  {} as dispatchType,
);

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, dispatch] = useReducer(reducer, []);
  const idRef = useRef(0);

  useEffect(() => {
    const localData = localStorage.getItem('diary') ?? '[]';
    const initDiaryData: DiaryType[] = JSON.parse(localData);

    let maxRef = 0;
    initDiaryData.forEach((diary) => {
      if (diary.id > maxRef) {
        maxRef = diary.id;
      }
    });

    idRef.current = maxRef + 1;

    dispatch({
      type: 'INIT',
      data: initDiaryData,
    });
    setIsLoading(false);
  }, []);

  const onCreate = (content: string, emotionId: number, createdDate: Date) => {
    dispatch({
      type: 'CREATE',
      data: {
        id: idRef.current++,
        createdDate,
        emotionId,
        content,
      },
    });
  };

  const onUpdate = (content: string, emotionId: number, id: number) => {
    dispatch({
      type: 'UPDATE',
      data: {
        id,
        createdDate: new Date().getTime(),
        emotionId,
        content,
      },
    });
  };

  const onDelete = (id: number) => {
    dispatch({
      type: 'DELETE',
      data: {
        id,
      },
    });
  };

  if (isLoading) {
    return <div>로딩중입니다.</div>;
  }

  return (
    <DiaryStateContext.Provider value={data}>
      <DiaryDispatchContext.Provider
        value={{
          onCreate,
          onUpdate,
          onDelete,
        }}
      >
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
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
}

export default App;
