'use client';
import {createContext, useContext, useEffect, useState} from 'react';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    sendPasswordResetEmail,
    updateProfile,
    deleteUser,
    sendEmailVerification,
} from 'firebase/auth';
import {auth, db} from '/service/firebase';
import {
    doc,
    setDoc,
    deleteDoc,
    getDoc,
    updateDoc,
    serverTimestamp,
} from 'firebase/firestore';
import {useRouter} from 'next/navigation';
import {setCookie, deleteCookie} from 'cookies-next';
import swal from 'sweetalert';

const UserContext = createContext();

export const AuthContextProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const router = useRouter();

    const createUser = async (name, phone, email, password) => {
        createUserWithEmailAndPassword(auth, email, password)
            .then(() => {
                updateProfile(auth.currentUser, {
                    displayName: name,
                    photoURL: 'https://picsum.photos/200/300',
                });

                sendEmailVerification(auth.currentUser);

                setDoc(doc(db, 'Users', auth.currentUser.uid), {
                    Address: '',
                    Bio: '',
                    City: '',
                    Country: '',
                    Desc: '',
                    Email: email,
                    Name: name,
                    Phone: phone,
                    Role: 'User',
                    Logo: 'https://picsum.photos/200/300',
                })
                    .then((res) => console.log(res))
                    .catch((err) => console.log(err));

                router.push('/');
                setCookie('isLogin', true, {
                    maxAge: 60 * 60 * 24,
                });
                setCookie('ID', auth.currentUser.uid, {
                    maxAge: 60 * 60 * 24,
                });

                swal({
                    title: "Registrasi berhasil",
                    text: "Berhasil mendaftar di Kobot",
                    icon: "success",
                });

            })
            .catch((e) => {
                swal({
                    title: 'SatuKerja',
                    text: e.message,
                    icon: 'warning',
                    dangerMode: true,
                });
            });

    };

    const signIn = async (email, password) => {
        try {
            const result = await signInWithEmailAndPassword(auth, email, password);
            const user_ref = doc(db, 'Users', result.user.uid);
            const checkUser = await getDoc(user_ref);

            if (checkUser?.exists()) {

                await updateDoc(user_ref, {
                    LastLogin: serverTimestamp(),
                });

                // swal('Sukses')
                router.push('/submission');
                // setCookie('isLogin', true, {
                //     maxAge: 60 * 60 * 24,
                // });
                // setCookie('ID', auth.currentUser.uid, {
                //     maxAge: 60 * 60 * 24,
                // });
                setCookie('isLogin');
                setCookie('ID', auth.currentUser.uid);

            } else {
                const admin_ref = doc(db, 'Users', result.user.uid);
                const isAdmin = await getDoc(admin_ref);
                if (isAdmin.data().Role === 'admin') {
                    await updateDoc(admin_ref, {
                        LastLogin: serverTimestamp(),
                    });
                    router.push('/beranda');
                    setCookie('isLogin', true, {
                        maxAge: 60 * 60 * 24,
                    });
                    setCookie('ID', auth.currentUser.uid, {
                        maxAge: 60 * 60 * 24,
                    });
                    setCookie('role', 'admin', {
                        maxAge: 60 * 60 * 24,
                    });
                } else {
                    swal('User tidak ditemukan!');
                }
            }
        } catch (e) {
            console.log(e.message);
        }
    };

    const logout = () => {
        router.push('/auth/login');
        deleteCookie('isLogin');
        deleteCookie('ID');
        deleteCookie('role');
        signOut(auth);
    };

    const forgotPassword = (email) => {
        return sendPasswordResetEmail(auth, email);
    };

    const deleteCurrentUser = async () => {
        const currUser = auth.currentUser;
        try {
            router.push('/');
            deleteCookie('isLogin');
            deleteCookie('ID');
            deleteCookie('role');
            await deleteDoc(doc(db, 'Users', currUser.uid));
            await deleteUser(currUser);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => {
            unsubscribe();
        };
    }, []);

    return (
        <UserContext.Provider
            value={{
                createUser,
                user,
                logout,
                signIn,
                forgotPassword,
                deleteCurrentUser,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

export const UserAuth = () => {
    return useContext(UserContext);
};
