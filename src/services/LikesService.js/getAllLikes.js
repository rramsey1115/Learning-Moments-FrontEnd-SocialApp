export const getAllLikes = () => {
    return fetch("http://localhost:8088/userlikes?_expand=user&_expand=post").then(response => response.json())
}

export const getLikeByPostId = (postId) => {
    return fetch(`http://localhost:8088/userlikes?postId=${postId}&_expand=user&_expand=post`).then(res => res.json())
}

export const likePost = (newLikeObj) => {
    return fetch(`http://localhost:8088/userlikes`,
    {
        method: "POST",
        headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(newLikeObj),
    })
}

export const deleteFavoritedPost = (deletedObjId) => {
    return fetch(`http://localhost:8088/userlikes/${deletedObjId}`,{method: "DELETE"})
}
