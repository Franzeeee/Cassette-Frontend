import React, { useEffect } from 'react';
import useHome from '../../logic/home.logic';

export const Unverified = ({ setVerification }) => {
  const home = useHome();

  useEffect(() => {
    const checkVerification = async () => {
      while (home.isVerified === null) {
        await new Promise(resolve => setTimeout(resolve, 1000)); // Wait for 1 second before checking again
      }
      setVerification(home.isVerified);
    };

    checkVerification();
  }, [home.isVerified, setVerification]);

  return (
    <>
      {!home.isVerified && home.isVerified !== null && (
        <div className="alert-verify alert alert-warning d-flex flex-column w-100 p-1 justify-content-center align-items-center position-absolute z-2 ">
          <p>You are not VERIFIED. We sent a verification email to {home.email}.</p>
          <p>Email not received or Expired? <a onClick={home.handleResend} className='text-primary cursor-pointer'>{home.loadResend ? 'Loading' : 'Resend Email'}</a></p>
        </div>
      )}
    </>
  );
};
