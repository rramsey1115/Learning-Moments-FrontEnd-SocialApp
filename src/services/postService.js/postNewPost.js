export const PostNewPost = (postObj) => {
  console.log(postObj)
  return fetch("http://localhost:8088/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(postObj),
  })
  .then((res) => res.json());
};
