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
        // items: [
        //     {
        //         type: '',
        //         source_id: 0,
        //         can_set_category: false,
        //         can_doubt_category: false,
        //         is_favorite: false,
        //         marked_as_adds: 0,
        //         date: 0,
        //         post_id: 0,
        //         post_type: '',
        //         final_post: false,
        //         copy_owner_id: 0,
        //         copy_post_id: 0,
        //         copy_history: [],
        //         copy_post_date: 0,
        //         text: '',
        //         can_edit: 0,
        //         can_delete: 0,
        //         comments: {
        //             count: 0,
        //             can_post: 0,
        //             groups_can_post: true
        //         },
        //         likes: {
        //             count: 0,
        //             user_likes: 0,
        //             can_like: 0,
        //             can_publish: 0
        //         },
        //         reposts: {
        //             count: 0,
        //             user_reposted: 0 
        //         },
        //         views: {
        //             count: 0
        //         },
        //         donut: {
        //             is_donut: false
        //         },
        //         post_source: {
        //             type: ''
        //         },
        //         short_text_rate: 0,
        //         carousel_offset: 0, 
        //         attachments: [],
        //         geo: {
        //             place_id: '',
        //             title: '',
        //             type: '',
        //             countri_id: 0,
        //             city_id: 0,
        //             address: '',
        //             showmap: '',
        //         },
        //         photos: {
        //             count: 0,
        //             items: []
        //         }
        //     },
        // ],
        // profiles: [
        //     {
        //         photo_50: '',
        //         photo_100: '',
        //         screen_name: ''
        //     }
        // ],
        // groups: [],
        // nextFrom: '',
        // loading: false,
        // error: '',
        loading: false
    },
    reducers: {
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

export default newsSlice.reducer