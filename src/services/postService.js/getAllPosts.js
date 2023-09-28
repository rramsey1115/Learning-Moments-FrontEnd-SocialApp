
// returns an expanded array of ALL POSTS from database
export const getAllPosts = () => {
    return fetch("http://localhost:8088/posts?_expand=user&_expand=topic").then(response => response.json())
}