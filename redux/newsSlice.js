import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

export const fetchInitNews = createAsyncThunk(
    'news/fetchInitNews',
    async () => {
        const accessToken = useSelector(state => state.user.accessToken)
        const url = `https://api.vk.com/method/newsfeed.get?return_banned=0&access_token=${accessToken}&v=5.131`
        return fetch(url)
            .then((response) => response.json())
            .then((data) => {
                console.log(data.response.items[0].text);
            })
            .catch(error => console.log(error))
    }
)

export const newsSlice = createSlice({
    name: 'news',
    initialState: {
        items: [
            {
                type: '',
                sourceId: 0,
                date: 0,
                postId: 0,
                postType: ''
            }
        ],
        profiles: [],
        groups: [],
        nextFrom: '',
        loading: false,
        error: '',
    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(fetchInitNews.pending, (state) => {
            state.loading = true
        })
        builder.addCase(fetchInitNews.fulfilled, (state) => {
            state.loading = false
            
        })
        builder.addCase(fetchInitNews.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message
        })
    }
})

export default newsSlice.reducer