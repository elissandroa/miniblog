import { db } from "../firebase/config";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    signOut,
} from 'firebase/auth';

import { useState, useEffect } from 'react';

export const useAuthentication = () => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);

    //cleanup
    //deal with memory leak

    const [cancelled, setCancelled] = useState(false);

    const auth = getAuth();

    function checkIfIsCancelled() {
        if (cancelled) {
            return;
        }
    }

    const createUser = async (data) => {
        checkIfIsCancelled();

        setLoading(true);

        try {
            const { user } = await createUserWithEmailAndPassword(
                auth,
                data.email,
                data.password
            );
            await updateProfile(user, {
                displayName: data.displayName,
            });
            
            setLoading(false);
            if(!error){
                setError(false);
            }

            return user;

        } catch (error) {
    
            let systemErrorMessage;

            if(error.message.includes("Password")){
                systemErrorMessage = "A senha precisa conter pelo menos 6 caracteres";
            } else if (error.message.includes("email-already")) {
                systemErrorMessage = "E-mail já cadastrado."

            } else {
                systemErrorMessage = "Ocorreu um erro, por favor tente mais tarde.";
            }
            setLoading(false);
            setError(systemErrorMessage);
        }


    }

    const logout = () => {
        checkIfIsCancelled();
        signOut(auth);
    }
 
    useEffect(() => {
        return  () => setCancelled(true);
    }, [])

    return {
        auth,
        createUser, 
        error,
        loading,
        logout,
    };
}