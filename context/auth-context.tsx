import { createContext, useEffect, useState } from "react";

interface AuthContextInterface {
    email: string,
    isLogged: boolean,
    setContext: (logged: boolean, email: string) => void,
    logout: () => void
}

const AuthContext = createContext<AuthContextInterface>({
    isLogged: false,
    email: '',
    setContext: () => { },
    logout: () => { }
});

export const AuthContextProvider = (props: any) => {
    const [isLogged, setLogged] = useState(false)
    const [email, setEmail] = useState('')

    useEffect(() => {
        fetch('../../api/auth/validate', {
            method: 'GET',
            credentials: 'include'
        })
            .then(response => response.json())
            .then((data) => {
                if (data.message === 'Successful') {
                    contextHandler(true, data.email)
                }
            })
            .catch((e) => {
                console.log('1');
                
            })
    }, [])
    
    const contextHandler = (logged: boolean, email: string) => {
        setLogged(logged)
        setEmail(email)
    }

    const logoutHandler = async () => {
        await fetch('../../api/auth/logout', {
            method: 'GET',
            credentials: 'include'
        })
            .then(response => response.json())
            .then(() => contextHandler(false, ''))
    }

    const contextValue = {
        email: email,
        isLogged: isLogged,
        setContext: contextHandler,
        logout: logoutHandler
    }
    return (
        <AuthContext.Provider value={contextValue}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContext;