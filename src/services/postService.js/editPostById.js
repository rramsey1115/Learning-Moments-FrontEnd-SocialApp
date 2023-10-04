export const editPostById = (postId, userChoices) => {

    return fetch(`http://localhost:8088/posts/${postId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userChoices)
        })
}