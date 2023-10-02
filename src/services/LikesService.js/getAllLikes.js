export const getAllLikes = () => {
    return fetch("http://localhost:8088/userlikes?_expand=user&_expand=post").then(response => response.json())
}

export const getLikeByPostId = (postId) => {
    return fetch(`http://localhost:8088/userlikes?postId=${postId}&_expand=user&_expand=post`)
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
