import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import LoadingSpinner from '@/components/LoadingSpinner';

const withAuth = (WrappedComponent: React.ComponentType) => {
  const AuthHOC = (props: any) => {
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

    useEffect(() => {
      if (!token) {
        router.push('/');
      } else {
        setLoading(false);
      }
    }, [token, router]);

    if (loading) {
      return <><LoadingSpinner/></>;
    }

    return <WrappedComponent {...props} />;
  };

  return AuthHOC;
};

export default withAuth;
