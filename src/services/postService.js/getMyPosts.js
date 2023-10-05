export const getPostsByUserId = (userId) => {
    return fetch(`http://localhost:8088/posts?userId=${userId}&_expand=topic&_expand=user&_embed=userLikes`).then(response => response.json())
}