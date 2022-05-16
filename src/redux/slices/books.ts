import {createAsyncThunk, createEntityAdapter, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../store";


export interface pageTokensState {
    position: any[],
    value: string
}

export interface bookPagesState {
    content: string,
    tokens?: pageTokensState
}

export interface bookSliceState {
    pages: bookPagesState
};


const initialState: bookSliceState = {
    pages: {
        content: "",
        tokens: {
            position: [],
            value: ""
        }
    }
};

const bookState = createEntityAdapter<bookSliceState>();

export const bookSLice = createSlice({
    name: "book",
    initialState: bookState.getInitialState(),
    reducers: {
        setBook: (state, action: PayloadAction<any>) => {
            bookState.setOne(state, action.payload.books)
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getBook.fulfilled, (state, action: PayloadAction<any>) => {
            // Add user to the state array
            const {book} = action.payload.data;
            bookState.setOne(state, book)
        })
    }
});


export const bookSelectors = bookState.getSelectors<RootState>(
    (state) => state.book
)

const graphqlAPI = (query: any) => fetch("https://fullstack-engineer-test-n4ouilzfna-uc.a.run.app//graphql", {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({query})
});

export const getBook = createAsyncThunk("get book", async () =>
    await (await graphqlAPI(`
            query {
              book {
                pages {
                  content
                  tokens {
                    position
                    value
                  }
                }
              }
            }
  `)).json()
);


export default bookSLice.reducer;

