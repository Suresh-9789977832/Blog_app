import { createContext, useEffect, useState } from "react";

    export const Usercontext = createContext()

const Userprovider = ({ children }) => {
    const [currentstate, setcurrentstate] = useState(JSON.parse(localStorage.getItem("user")))

    useEffect(() => {
        localStorage.setItem('user',JSON.stringify(currentstate))
    }, [currentstate])

    return <Usercontext.Provider value={{currentstate,setcurrentstate}}>
            {children}
    </Usercontext.Provider>
}

export default Userprovider