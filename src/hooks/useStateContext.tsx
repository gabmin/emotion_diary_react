import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from 'react';
import {
  DiaryType,
  dispatchType,
  reducerDiaryType,
  stateType,
} from '../types/diaryType';

const isDiaryType = (data: DiaryType | DiaryType[]): data is DiaryType => {
  return (data as DiaryType).id !== undefined;
};

const DiaryStateContext = createContext<stateType>({
  data: [],
  isLoading: false,
});
const DiaryDispatchContext = createContext<dispatchType>({} as dispatchType);

export const useStateContext = () => {
  const { data, isLoading } = useContext(DiaryStateContext);

  return { data, isLoading };
};

export const useDispatchContext = () => {
  const { onCreate, onUpdate, onDelete } = useContext(DiaryDispatchContext);

  return { onCreate, onUpdate, onDelete };
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

  const onCreate = useCallback(
    (content: string, emotionId: number, createdDate: Date) => {
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
    [dispatch],
  );

  const onUpdate = useCallback(
    (content: string, emotionId: number, id: number) => {
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
    [dispatch],
  );

  const onDelete = useCallback(
    (id: number) => {
      dispatch({
        type: 'DELETE',
        data: {
          id,
        },
      });
    },
    [dispatch],
  );
  const dispatchAction = {
    onCreate,
    onUpdate,
    onDelete,
  };

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

  return (
    <DiaryStateContext value={{ data, isLoading }}>
      <DiaryDispatchContext value={dispatchAction}>
        {children}
      </DiaryDispatchContext>
    </DiaryStateContext>
  );
};

export default {
  stateProvider: StateProvider,
  useStateContext,
};
