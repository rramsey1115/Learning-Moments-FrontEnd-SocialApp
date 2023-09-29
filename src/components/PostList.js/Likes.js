import { useEffect, useState } from "react";
import { getAllLikes } from "../../services/LikesService.js/getAllLikes";


export const Likes = ({ post }) => {
    const [allLikes, setAllLikes] = useState([])
    const [postLikes, setPostLikes] = useState([])

    useEffect(() => {
        getAllLikes().then((likesArray) => {
            setAllLikes(likesArray)
        })
    }, [])

    useEffect(() => {
        const foundLikes = allLikes.filter((like) => like.postId === post.id)
        setPostLikes(foundLikes)
    }, [allLikes, post.id])

    return (
        <div key={post.id} className="post-likes"><h5>Likes: {postLikes.length}</h5></div>
    )
}