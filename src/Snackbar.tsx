import classes from './Snackbar.module.css';
import {
  createContext,
  FC,
  PropsWithChildren,
  useCallback,
  useContext,
  useState,
} from 'react';
import { createPortal } from 'react-dom';

type Show = (message: string, timeout?: number) => Promise<void>;
type Entry = { message: string; timerId?: number };

const SnackbarContext = createContext<{ show: Show }>({
  show: async () => {
    throw new Error('SnackbarProvider not provided');
  },
});

export const useSnackbar = () => useContext(SnackbarContext);

export const SnackbarProvider: FC<PropsWithChildren> = ({ children }) => {
  const [entries, setEntries] = useState<Entry[]>([]);

  const removeEntry = (entry: Entry) => {
    if (!entry.timerId) return;
    clearTimeout(entry.timerId);
    setEntries((entries) => entries.filter((e) => e !== entry));
  };

  const show: Show = useCallback(async (message, timeout = 1000) => {
    return new Promise((resolve) => {
      const entry: Entry = { message };
      entry.timerId = setTimeout(() => {
        removeEntry(entry);
        resolve();
      }, timeout);
      setEntries((entries) => [...entries, entry]);
    });
  }, []);

  return (
    <>
      <SnackbarContext.Provider value={{ show }}>
        {children}
      </SnackbarContext.Provider>
      {createPortal(
        <ul className={classes.container}>
          {entries.map((entry, index) => (
            <li key={index} className={classes.item}>
              <span>{entry.message}</span>
              <button type="button" onClick={() => removeEntry(entry)}>
                x
              </button>
            </li>
          ))}
        </ul>,
        document.body,
      )}
    </>
  );
};
