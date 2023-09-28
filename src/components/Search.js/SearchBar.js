import { useEffect, useState } from "react"

export const SearchBar = (filteredPosts, setFilteredPosts) => {
const [userInput, setUserInput] = useState("")

useEffect(() => {
    const foundPosts = filteredPosts.filter((post) => post.title.toLowerCase().includes(userInput.toLowerCase()))
    setFilteredPosts(foundPosts)
}, [userInput])

    return (
        <input type="text" value={userInput} className="posts-search" placeholder="Search Posts" onChange={(event) => {setUserInput(event.target.value)}}></input>
    )
}