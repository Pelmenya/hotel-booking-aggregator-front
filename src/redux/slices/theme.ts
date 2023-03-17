import { createSlice  } from '@reduxjs/toolkit';
import { HYDRATE  } from 'next-redux-wrapper';

export interface IThemeState {
 theme: 'dark' | 'light';
}

const initialState: IThemeState = {
    theme: 'light',
};

export const themeSlice  = createSlice({ name: 'theme', initialState,

    reducers: {

        setTheme(state, action) {
            state.theme  = action.payload;
        },

        // Special reducer for hydrating the state. Special case for next-redux-wrapper 
        [HYDRATE]: (state, action) => {
            return  {
                ...state,
                ...action.payload.auth,
            };
        },
    },

},
);

export const { setTheme  } = themeSlice.actions;

