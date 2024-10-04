import { useReducer, useState } from 'react';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  level1: {
    level2: {
      recipes: [{ id: 1, name: 'Pancakes' }],
    },
  },
};

const { reducer, actions } = createSlice({
  name: 'recipes',
  initialState,
  reducers: {
    addRecipe: (state, { payload }) => {
      const id = Math.max(...state.level1.level2.recipes.map((r) => r.id)) + 1;
      state.level1.level2.recipes.push({ id, name: payload.name });
    },
    updateName: (state, { payload }) => {
      state.level1.level2.recipes[payload.index].name = payload.newName;
    },
  },
});

export const App = () => {
  const [name, setName] = useState('');
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <main>
      <ul>
        {state.level1.level2.recipes.map((recipe, index) => (
          <li>
            <input
              value={recipe.name}
              onChange={(e) =>
                dispatch(actions.updateName({ index, newName: e.target.value }))
              }
            />
          </li>
        ))}
      </ul>
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <button onClick={() => dispatch(actions.addRecipe({ name }))}>
        Create
      </button>
    </main>
  );
};
