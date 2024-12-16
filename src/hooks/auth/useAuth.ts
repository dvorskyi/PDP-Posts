import {useEffect, useState} from 'react';
import {supabase} from '@/lib/supabase/supabaseClient';
import {User} from '@supabase/supabase-js';
// import {EStorageKeys} from "@/constants";

export function useAuth(): User | null {
    const [user, setUser] = useState<User | null>(null);
    // const {setItem: setCurrentUser, getItem: getCurrentUser} = cookiesService(EStorageKeys.CURRENT_USER);

    useEffect(() => {
        // const currentUser = getCurrentUser();
        const fetchUser = async () => {
            // if (currentUser) {
            //     setUser(currentUser as User);
            //     return;
            // }

            const { data } = await supabase.auth.getUser();
            // setCurrentUser(data?.user);

            setUser(data?.user || null);
        };

        fetchUser();

        const { subscription } = supabase.auth.onAuthStateChange(() => {
            fetchUser();
        });

        return () => subscription.unsubscribe();
    }, []);

    return user;
}
