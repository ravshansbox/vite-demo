import classes from './App.module.css';
import { useEffect } from 'react';
import { useSnackbar } from './Snackbar';

export const App = () => {
  const { show } = useSnackbar();

  useEffect(() => {
    show('Hello World 2000', 2000).then(() => console.log('removed 2000'));
    show('Hello World 4000', 4000).then(() => console.log('removed 4000'));
  }, []);

  return <h1 className={classes.heading}>Hello World</h1>;
};
