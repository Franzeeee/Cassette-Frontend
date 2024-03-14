import React from 'react';
import LogoutButton from '../Components/LogoutButton';
import useHome from '../logic/home.logic'; // Import the useHome hook

function Home() {
    const home = useHome(); // Use the useHome hook to fetch the user's name

    return (
        <div className='container-fluid vw-100 vh-100 d-flex text-center flex-column align-items-center justify-content-start'>
            { home.isVerified == null &&
                        <div className="alert-verify alert alert-warning mt-2 w-100">
                            <p>You are not VERIFIED. We sent a verification email to {home.email}.</p>
                            <p>Email not received or Expired? <a onClick={home.handleResend} className='text-primary cursor-pointer'>{ home.loadResend ? 'Loading' : 'Resend Email' }</a></p>
                        </div>
            }
            <div className="main w-100vw">
                <p>Welcome! <span className='text-primary'>{home.name}</span></p>
                { home.isVerified && home.isVerified !== null ?
                    <p>You are <b>Verified</b></p> :
                    <p>You are <b>Not Verified</b></p>
                }
                <LogoutButton />
            </div>
        </div>
    );
}

export default Home;
