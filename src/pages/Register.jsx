import { Link } from 'react-router-dom';
import { useState } from 'react';
import SocialMediaButton from '../Components/SocialMediaButton';
import NameLogo from '../Components/NameLogo';
import useRegister from '../logic/register.logic';
import FormButton from '../Components/FormButton';
import AlertMessage from '../Components/AlertMessage';
import '../assets/css/custom.css'
import TermsConditionModal from '../Components/TermsConditionModal';

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

function Register() {
    const { 
            formData, 
            responseMessage, 
            errorMessage, 
            isLoading,
            isChecked,
            setIsChecked,
            showModal,
            emailError,
            passwordError,
            disagree,
            handleChange, 
            handleSubmit, 
            handleCheckbox, 
        } = useRegister();
    const [show, setShow] = useState(false)
    const handleOpen = () => setShow(true)

    return (
        <div className='container-fluid d-flex justify-content-center align-items-center vh-100 vw-100 bg-main-custom'>
            <ToastContainer />
            <TermsConditionModal 
                show={show}
                handleClose={() => setShow(false)}
            />
            {responseMessage && (<AlertMessage type="success" message={responseMessage}/>)}
            {errorMessage && (<AlertMessage type="danger" message={errorMessage}/>)}

            <div className='py-4 px-3 rounded bg-secondary-custom text-white w-35 d-flex flex-column align-items-center'>
                <NameLogo text="Register to Cassette"/>
                <form className='w-75' onSubmit={handleSubmit}>
                    <div className='email-input d-flex flex-column align-items-start justify-content-center gap-1'>
                        <label htmlFor="email" className='label-font'>Username or Email</label>
                        <input type="email" autoComplete='off' name='email' placeholder='Example@gmail.com' value={formData.email} onChange={handleChange} className={`form-control rounded-custom fs-6 ${emailError ? 'invalid-input' : ''}`}/>
                    </div>
                    <div className='pw-input d-flex flex-column align-items-start justify-content-center gap-1 mt-2'>
                        <label htmlFor="password" className='label-font'>Password</label>
                        <input type="password" name='password' value={formData.password} onChange={handleChange} placeholder='Enter Password' className={`form-control rounded-custom fs-6 ${passwordError ? 'invalid-input' : ''}`}/>
                    </div>
                    <div className={`d-flex align-items-start justify-content-center gap-1 mt-3 terms-condition ${!disagree ? 'error' : ''}`}>
                        <input type="checkbox" name='agreement' onChange={handleCheckbox} className='custom-checkbox'/>
                        <label htmlFor="agreement" className='terms-condition-label'>I agree to the Cassette <span className='TermsConditionText' onClick={handleOpen}>Terms and Condition of use and Privacy Policy</span></label>
                    </div>
                    <FormButton text={'Register'} isLoading={isLoading} />
                </form>

                <div className='d-flex w-100 align-items-center justify-content-center gap-3'>
                    <div className="border-red mt-4 mb-3 w-100"></div>
                    <p className='mt-3'>or</p>
                    <div className="border-red mt-4 mb-3 w-100"></div>
                </div>

                <div className='w-75 d-flex flex-column gap-2 mt-2'>
                    <SocialMediaButton logo={"google"} text="Login using Google" />
                    <SocialMediaButton logo={"facebook"} text="Login using Facebook" />
                    <SocialMediaButton logo={"instagram"} text="Login using Instagram" />
                    <div className='fs-custom text-center mt-4'>
                        <p className="text-white">Already have an account? <u className="link-light"><Link to="/login" className="text-white custom-link-hover">Login here</Link>.</u></p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;
