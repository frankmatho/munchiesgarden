import { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const adminEmail = 'admin@gmail.com'; // Set your admin email here

  useEffect(() => {
    const auth = getAuth();

    // Listen to auth state changes (login/logout)
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        const isAdmin = firebaseUser.email === adminEmail;
        setUser({
          email: firebaseUser.email,
          role: isAdmin ? 'admin' : 'user', // Assign role based on email
        });
      } else {
        setUser(null); // User is logged out
      }
      setLoading(false);
    });

    return () => unsubscribe(); // Cleanup on component unmount
  }, []);

  return { user, loading };
};

export default useAuth;
