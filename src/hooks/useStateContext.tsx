import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from 'react';
import { contextType, DiaryType, reducerDiaryType } from '../types/diaryType';

const isDiaryType = (data: DiaryType | DiaryType[]): data is DiaryType => {
  return (data as DiaryType).id !== undefined;
};

const DiaryStateContext = createContext<contextType>({} as contextType);

export const useStateContext = () => {
  const { data, isLoading, onCreate, onUpdate, onDelete } =
    useContext(DiaryStateContext);

  return { data, isLoading, onCreate, onUpdate, onDelete };
};

export const StateProvider = ({ children }: { children: ReactNode }) => {
  const idRef = useRef(0);

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

  const [data, dispatch] = useReducer(reducer, []);

  const dispatchAction = useMemo(
    () => ({
      onCreate: (content: string, emotionId: number, createdDate: Date) => {
        dispatch({
          type: 'CREATE',
          data: {
            id: idRef.current++,
            createdDate,
            emotionId,
            content,
          },
        });
      },
      onUpdate: (content: string, emotionId: number, id: number) => {
        dispatch({
          type: 'UPDATE',
          data: {
            id,
            createdDate: new Date().getTime(),
            emotionId,
            content,
          },
        });
      },
      onDelete: (id: number) => {
        dispatch({
          type: 'DELETE',
          data: {
            id,
          },
        });
      },
    }),
    [data],
  );

  const [isLoading, setIsLoading] = useState(true);

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

  const value = {
    data,
    isLoading,
    ...dispatchAction,
  };
  return <DiaryStateContext value={value}>{children}</DiaryStateContext>;
};

export default {
  stateProvider: StateProvider,
  useStateContext,
};
