
// returns an expanded array of ALL POSTS from database
export const getAllPosts = () => {
    return fetch("http://localhost:8088/posts?_expand=user&_expand=topic").then(response => response.json())
}

// returns expanded array of posts based on postId
export const getPostsById = (id) => {
    return fetch(`http://localhost:8088/posts?id=${id}&_expand=user&_expand=topic`).then(response => response.json())
}

export const updatePost = (postObj) => {
    return fetch(`http://localhost:8088/posts?id=${postObj.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(postObj)
    })
}
