import { Link } from 'react-router-dom';
import '../assets/css/custom.css';
import SocialMediaButton from '../Components/SocialMediaButton';
import NameLogo from '../Components/NameLogo';
import useLogin from '../logic/login.logic';
import FormButton from '../Components/FormButton';
import AlertMessage from '../Components/AlertMessage';

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

function Login() {
    //login logics and hooks
    const { formData, responseMessage, errorMessage, isLoading, handleChange, handleSubmit } = useLogin();

    return (
        <div className='container-fluid d-flex justify-content-center align-items-center vh-100 vw-100 bg-main-custom'>
            <ToastContainer />
            {responseMessage && <AlertMessage type="success" message={responseMessage} />}
            {errorMessage && <AlertMessage type="danger" message={errorMessage} />}
            
            <div className='px-4 py-3 rounded bg-secondary-custom text-white w-35 d-flex flex-column align-items-center justify-content-center'>
                <NameLogo text="Login to Cassette"/>
                <div className='w-75 d-flex flex-column align-items-center justify-content-center gap-2'>
                    <SocialMediaButton logo={"google"} text="Login using Google" />
                    <SocialMediaButton logo={"facebook"} text="Login using Facebook" />
                    <SocialMediaButton logo={"instagram"} text="Login using Instagram" />
                </div>
                <div className="border-red mt-4 mb-3 w-100"></div>
                <form className='w-75' onSubmit={handleSubmit}>
                    <div className='email-input w-100 d-flex flex-column align-items-start justify-content-center gap-1'>
                        <label htmlFor="email" className='label-font'>Email</label>
                        <input type="email" autoComplete='off' required name='email' value={formData.email} onChange={handleChange} placeholder='Example@gmail.com' className='form-control rounded-custom fs-7'/>
                    </div>
                    <div className='pw-input mb-3'>
                        <label htmlFor="password" className='label-font'>Password</label>
                        <input type="password" name='password' required value={formData.password} onChange={handleChange} placeholder='Enter Password' className='form-control fs-7 rounded-custom'/>
                    </div>

                    <FormButton isLoading={isLoading} text={'Login'}/>
                    
                    <div className='mt-2 fs-custom text-center'>
                        <p className='cursor-pointer'><u>Forgot your Password?</u></p>
                    </div>
                </form>
                <div className="border-red mt-4 mb-3 w-100"></div>
                <div className='fs-custom text-center'>
                    <p className="text-white">Don't have an account? <u className="link-light"><Link to="/register" className=" text-white">Sign up for Cassette</Link>.</u></p>
                </div>
            </div>
        </div>
    );
}

export default Login;
