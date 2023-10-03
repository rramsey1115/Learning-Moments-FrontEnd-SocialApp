export const getMyPosts = (id) => {
    return fetch(`http://localhost:8088/posts?userId=${id}&_expand=topic&_expand=user`).then(response => response.json())
}