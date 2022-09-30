import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";


export const fetchInitNews = createAsyncThunk(
    'news/fetchInitNews',
    async () => {
        const accessToken = useSelector(state => state.user.accessToken)
        const url = `https://api.vk.com/method/newsfeed.get?return_banned=0&access_token=${accessToken}&v=5.131`
        // console.log(accessToken)
        const response = await fetch(url)
        return response.json()
    }
)

export const newsSlice = createSlice({
    name: 'news',
    initialState: { 
        loading: false
    },
    reducers: {
        setNews: (state, action) => {
            state = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchInitNews.pending, (state) => {
            // state.loading = true
        })
        builder.addCase(fetchInitNews.fulfilled, (state, action) => {
            // state.loading = false
            state = { ...action.payload.response, loading: false}
            // console.log(state.items[0].text)
        })
        builder.addCase(fetchInitNews.rejected, (state, action) => {
            // state.loading = false
            // state.error = action.error.message
        })
    }
})
export const { setNews } = newsSlice.actions
export default newsSlice.reducer