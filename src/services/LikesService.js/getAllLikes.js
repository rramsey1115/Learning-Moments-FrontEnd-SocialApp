export const getAllLikes = () => {
    return fetch("http://localhost:8088/userlikes?_expand=user&_expand=post").then(response => response.json())
}