import './App.css';
import Home from './pages/Home';
import New from './pages/New';
import Dairy from './pages/Diary';
import NotFound from './pages/NotFound';
import Edit from './pages/Edit';
import { Route, Routes } from 'react-router-dom';
import { useReducer, useRef, createContext } from 'react';
import { DiaryType, reducerDiaryType } from './types/diaryType';

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
export const DiaryDispatchContext = createContext({});

const mockData = [
  {
    id: 0,
    createdDate: new Date('2025-03-15').getTime(),
    emtionId: 2,
    content: '슬픈 날이네요',
  },
  {
    id: 1,
    createdDate: new Date('2025-02-15').getTime(),
    emtionId: 1,
    content: '아싸뵤!!',
  },
  {
    id: 2,
    createdDate: new Date('2025-03-17').getTime(),
    emtionId: 4,
    content: '개같네요',
  },
];

function App() {
  const [data, dispatch] = useReducer(reducer, mockData);
  const idRef = useRef(0);

  const onCreate = (content: string, emtionId: number) => {
    dispatch({
      type: 'CREATE',
      data: {
        id: idRef.current++,
        createdDate: new Date().getTime(),
        emtionId,
        content,
      },
    });
  };

  const onUpdate = (content: string, id: number, emtionId: number) => {
    dispatch({
      type: 'UPDATE',
      data: {
        id,
        createdDate: new Date().getTime(),
        emtionId,
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
