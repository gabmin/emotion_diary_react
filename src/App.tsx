import './App.css';
import Home from './pages/Home';
import New from './pages/New';
import Dairy from './pages/Diary';
import NotFound from './pages/NotFound';
import Edit from './pages/Edit';
import { Route, Routes } from 'react-router-dom';
import { useReducer, useRef, createContext } from 'react';
import { DiaryType, reducerDiaryType, dispatchType } from './types/diaryType';

const reducer = (state: DiaryType[], action: reducerDiaryType) => {
  switch (action.type) {
    case 'CREATE':
      return [action.data, ...state];
    case 'UPDATE':
      return state.map((diary) =>
        diary.id === action.data.id ? action.data : diary,
      );
    case 'DELETE':
      return state.filter((diary) => diary.id !== action.data.id);

    default:
      return state;
  }
};

export const DiaryStateContext = createContext<DiaryType[]>([]);
export const DiaryDispatchContext = createContext<dispatchType>(
  {} as dispatchType,
);

function App() {
  const [data, dispatch] = useReducer(reducer, []);
  const idRef = useRef(0);

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

  return (
    <DiaryStateContext.Provider value={data}>
      <DiaryDispatchContext.Provider
        value={{
          onCreate,
          onUpdate,
          onDelete,
        }}
      >
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
