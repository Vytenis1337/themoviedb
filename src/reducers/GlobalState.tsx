import {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from 'react';

// initial state

type GlobalProviderProps = {
  children: ReactNode;
};

interface ListItem {
  id: number;
  title: string;
  poster_path: string;
}

interface CheckItem {
  id: number;
}

type GlobalContextProps = {
  addMovieToLibrary: any;
  removeMovieFromWatchlist: any;
  addMovieToWatched: any;
  moveToWatchlist: any;
  removeFromWatched: any;
  library: ListItem[];
  checkId: CheckItem[];
  setCheckId: Dispatch<SetStateAction<CheckItem[]>>;
};

// create context
export const GlobalContext = createContext({} as GlobalContextProps);

export function useGlobal() {
  return useContext(GlobalContext);
}

// provider components
export const GlobalProvider = ({ children }: GlobalProviderProps) => {
  // useEffect(() => {
  //   localStorage.setItem('watchlist', JSON.stringify(state.watchlist));
  //   localStorage.setItem('watched', JSON.stringify(state.watched));
  // }, [state]);

  // actions
  const [library, setLibrary] = useState<ListItem[]>([]);

  const [checkId, setCheckId] = useState<CheckItem[]>([]);

  const addMovieToLibrary = (newItem: ListItem): void => {
    setLibrary((prevList) => [...prevList, newItem]);
  };

  const removeMovieFromWatchlist = (id: any) => {};

  const addMovieToWatched = (movie: any) => {};

  const moveToWatchlist = (movie: any) => {};

  const removeFromWatched = (id: any) => {};

 

  return (
    <GlobalContext.Provider
      value={{
        addMovieToLibrary,
        removeMovieFromWatchlist,
        addMovieToWatched,
        moveToWatchlist,
        removeFromWatched,
        library,
        checkId,
        setCheckId,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
