import React, { useEffect, useState } from 'react';
import { Route, Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../lib/config';

function Protected({ children }: React.PropsWithChildren) {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthenticated(true);
      } else {
        setAuthenticated(false);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  if (loading) {
    // รอให้ auth ทำงานเสร็จ
    return <div>Loading...</div>;
  }

  if (authenticated) {
    return <>{children}</>;
  } else {
    return <Navigate to="/login" replace />;
  }
}

export default Protected;
