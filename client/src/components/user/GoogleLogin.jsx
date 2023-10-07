import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from "jwt-decode";
import { useToasts } from 'react-toast-notifications';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../../redux/slices/userSlice';
import axios from 'axios';


const LoginWithGoogle = ({setLoader}) => {

    const { addToast } = useToasts();
    const navigate = useNavigate();
    const dispatch = useDispatch()

    const handleGoogleLoginSuccess = async (credentialResponse) => {
        try {
            var decodedToken = jwt_decode(credentialResponse.credential);
            console.log(decodedToken, "❤️❤️❤️");
            setLoader(true)
            const response = await axios.post("http://localhost:7000/api/users/auth/google", decodedToken)
            if(response.status === 200) {
                dispatch(setCredentials({ user: response.data.user || response.data.userExists , token: response.data.token }))
                addToast("Google login successful", { appearance: 'success' });
                navigate('/');
                console.log("Google login successful", credentialResponse);
            }
        } catch (error) {
            if (error?.response?.status === 400) {
                const errorData = error.response.data.errors;
                let errorMsg = errorData.map(e => e?.msg || e)
                setLoader(false)
                errorMsg.forEach(e => addToast(e, { appearance: "error" }))
            } else {
                const err = error?.response?.data?.error
                console.error(err)
                setLoader(false)
                handleGoogleLoginFailure(err)
            }
        } finally {  
            setLoader(false)
        }
    };

    const handleGoogleLoginFailure = (error) => {
        console.error("Google login failed", error);
        addToast("Google login failed", { appearance: 'error' });
    };

    return (
        <div id="signInButton">
            <GoogleLogin
                onSuccess={handleGoogleLoginSuccess}
                onError={handleGoogleLoginFailure}
            />
        </div>
    );
};

export default LoginWithGoogle;
