import { createContext, useEffect, useState } from "react";

interface AuthContextInterface {
    email: string,
    isLogged: boolean,
    isAdmin: boolean,
    setContext: (email: string, isLogged: boolean, isAdmin : boolean) => void,
    logout: () => void
}

const AuthContext = createContext<AuthContextInterface>({
    email: '',
    isLogged: false,
    isAdmin: false,
    setContext: () => { },
    logout: () => { }
});

export const AuthContextProvider = (props: any) => {
    const [email, setEmail] = useState('')
    const [isLogged, setLogged] = useState(false)
    const [isAdmin, setAdmin] = useState(false)

    useEffect(() => {
        fetch('../../api/auth/validate', {
            method: 'GET',
            credentials: 'include'
        })
            .then(response => response.json())
            .then((data) => {
                if (data.message === 'Successful') {
                    contextHandler(data.email, true, data.isAdmin)
                }
            })
            .catch((e) => {
                console.log('Error');
            })
    }, [])

    const contextHandler = (email: string, logged: boolean, admin: boolean) => {
        setEmail(email)
        setLogged(logged)
        
        setAdmin(admin)
    }

    const logoutHandler = async () => {
        await fetch('../../api/auth/logout', {
            method: 'GET',
            credentials: 'include'
        })
            .then(response => response.json())
            .then(() => contextHandler('', false, false))
    }

    const contextValue = {
        email: email,
        isLogged: isLogged,
        isAdmin: isAdmin,
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