import React, { createContext, useContext, useState, useEffect } from 'react';
import {
    auth,
    db
} from '../firebase';
import {
    onAuthStateChanged,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    GoogleAuthProvider,
    signInWithPopup
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            setUser(currentUser);
            if (currentUser) {
                // Fetch additional user data from Firestore
                const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
                if (userDoc.exists()) {
                    const data = userDoc.data();

                    // Check if user is blocked
                    if (data.isBlocked) {
                        await signOut(auth);
                        setUser(null);
                        setUserData(null);
                        alert("Your account has been blocked by the administrator.");
                        return;
                    }

                    setUserData(data);
                    setIsAdmin(data.role === 'admin');
                } else {
                    // If no doc exists (e.g. first time Google login), create one
                    const newData = {
                        name: currentUser.displayName || currentUser.email.split('@')[0],
                        email: currentUser.email,
                        role: 'user',
                        createdAt: new Date().toISOString(),
                        isBlocked: false
                    };
                    await setDoc(doc(db, 'users', currentUser.uid), newData);
                    setUserData(newData);
                    setIsAdmin(false);
                }
            } else {
                setUserData(null);
                setIsAdmin(false);
            }
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    const signup = async (email, password, name) => {
        const result = await createUserWithEmailAndPassword(auth, email, password);
        const userData = {
            name,
            email,
            email,
            role: 'user',
            createdAt: new Date().toISOString(),
            isBlocked: false
        };
        await setDoc(doc(db, 'users', result.user.uid), userData);
        return result;
    };

    const login = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    };

    const loginWithGoogle = async () => {
        const provider = new GoogleAuthProvider();
        return signInWithPopup(auth, provider);
    };

    const logout = () => {
        return signOut(auth);
    }

    const value = {
        user,
        userData,
        signup,
        login,
        loginWithGoogle,
        logout,
        isAdmin,
        loading
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}
