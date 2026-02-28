import { Suspense } from 'react';
import SignUpForm from './SignUpForm';
import Loading from './loading';

export default function SignUpPage() {
  return (
    <Suspense fallback={<Loading />}>
      <SignUpForm />
    </Suspense>
  );
}

export const dynamic = 'force-dynamic';
export const revalidate = 0;
