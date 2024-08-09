import React, { useState } from 'react';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

const AuthForm = () => {
    const [isLogin, setIsLogin] = useState(true); 

    const toggleForm = () => {
        setIsLogin(!isLogin); 
    };

    return (
        <div>
            {isLogin ? <LoginForm /> : <SignupForm />}
            <p>
                {isLogin ? (
                    <>
                        Don't have an account?{' '}
                        <a href="#signup" onClick={toggleForm}>Sign Up</a>
                    </>
                ) : (
                    <>
                        Already have an account?{' '}
                        <a href="#login" onClick={toggleForm}>Login</a>
                    </>
                )}
            </p>
        </div>
    );
};

export default AuthForm;
