export const UpdateProfile = (userId, userChoices) => {
// console.log(JSON.stringify(userChoices))
  return fetch(`http://localhost:8088/users/${userId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userChoices),
  });
};
