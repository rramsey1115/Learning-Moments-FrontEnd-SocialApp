export const getFavPosts = (currentUser) => {
    return fetch(`http://localhost:8088/userLikes?userId=${currentUser.id}&_expand=post&_expand=user`).then((response) => response.json())
}