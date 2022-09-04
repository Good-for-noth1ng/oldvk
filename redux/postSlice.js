import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

export const fetchInitNews = createAsyncThunk(
    'post/fetchInitNews',
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

export const postSlice = createSlice({
    name: 'post',
    initialState: {
        items: [],
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

export default postSlice.reducer