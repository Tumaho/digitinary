import { createContext, useState, useEffect } from "react";
import axios from "axios";
export const PostContext = createContext();




export default function PostContextComponent(props) {
    const [user, setUser] = useState([]);

    useEffect(() => {
            getUsersData()
            .then((data) => {
                setUser(data)
            });
            

    }, []);


    
    
    const getUsersData = async () => {
        const { data } = await axios.get(
            `https://jsonplaceholder.typicode.com/users`
        );
    
        return data;
    };



    let state = {
        user,
    }

    return (
        <PostContext.Provider value={state}>{props.children}</PostContext.Provider>
    )
}