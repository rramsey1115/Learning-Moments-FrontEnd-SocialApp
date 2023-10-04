export const DeletePost = (postId) => {
    return fetch(`http://localhost:8088/posts/${postId}`, {method: "DELETE"})
}