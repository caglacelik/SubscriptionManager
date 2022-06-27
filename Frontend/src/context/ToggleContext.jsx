import { createContext, useState } from "react";

const ChangeContext = createContext(null);

export const ToggleProvider = ({ children }) => {
    const [toggle, setToggle] = useState(false);

    return (
        <ChangeContext.Provider value={{toggle, setToggle}}>
            {children}
        </ChangeContext.Provider>
    )
}

export default ChangeContext
