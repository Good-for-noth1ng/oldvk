import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

export const initPost = createAsyncThunk(
    'post/initPost',
    async (data) => {
        let commentsCount = 0
        if (data.comments !== undefined) {
            commentsCount = data?.comments?.count
            if (commentsCount >= 1000) {
                commentsCount = Math.floor(commentsCount / 1000)
                commentsCount = String(commentsCount).concat('k')
            }
        }

        let likesCount = 0
        if (data.likes !== undefined) {
            likesCount = data?.likes?.count
            if (likes >= 1000) {
                likes = Math.floor(likes / 1000)
                likes = String(likes).concat('k')
            }
        }

        let repostsCount = 0
        if (data.reposts !== undefined) {
            repostsCount = data?.reposts?.count
            if (repostsCount >= 1000) {
                repostsCount = Math.floor(repostsCount / 1000)
                repostsCount= String(repostsCount).concat('k')
            }
        }

        let postText = ''
        if (data.text !== undefined) {
            if (data.text.split(' ').length > 51) {
                postText = data.text.split(' ').slice(0, 50).join(' ')
            } else {
                postText = data.text
            }
        }

        const date = new Date(data.date * 1000).toLocaleDateString()
        
        let groupData = {}
        let profileData = {}
        if (data.source_id < 0) {
            groupData = useSelector(state => state.news.groups.find(group => group.id === 0 - data.source_id)) 
        } else {
            profileData = useSelector(state => state.news.profiles.finde(profile => profile.id === data.source_id))
        }

        return {
            key: data.key,
            text: postText,
            commentsCount: commentsCount,
            likesCount: likesCount,
            repostsCount: repostsCount,
            date: date,
            group: groupData,
            profile: profileData,
            isPressed: false,
            readMore: false
        }
    }   
)
export const postSlice = createSlice({
    name: 'post',
    initialState: {
        data: [],
    },
    reducers: {
        setPosts: (state, action) => {
            state.data.push(action.payload)
        },
        // setIsPressed: (state, action) => {
        //     return {
        //         data: [
        //             ...state.data.filter(post => post.key !== action.payload.key),
        //             action.payload
        //         ]
        //     }
        // },
        // increaseLikes: (state, action) => {
        //     state.data.find(post => post.key === action.key).likesCount
        //     return {
        //         data: [
        //             ...state.data.filter(post => post.key !== action.payload),
        //             {
        //                 ...state.data.find(post => post.key === action.payload),
        //                 likesCount: state.data.find(post => post.key === action.payload).likesCount + 1   
        //             }
        //         ]
        //     }
        // },
        setLike: (state, action) => {
            const post = state.data.find(post => post.key === action.payload.key)
            return {
                data: [
                    ...state.data.filter(post => post.key !== action.payload.key),
                    {
                        ...post,
                        likesCount: action.payload.likesCount,
                        isPressed: action.payload.isPressed   
                    }
                ]
            }
        }
    },
    extraReducers: (builder) =>{
        builder.addCase(initPost.fulfilled, (state, action) => {
            state.data.push(action.payload)
        }) 
    }
})
export const { setPosts, setIsPressed } = postSlice.actions
export default postSlice.reducer
