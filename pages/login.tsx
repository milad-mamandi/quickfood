import styles from '../styles/Auth.module.css'
import { useReducer, useRef, useState, createRef, useContext } from 'react';
import { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Input from "../components/UI/Input";
import { checkEmailValidity } from '../components/Tools/ValidtyCheck';
import { loginFormType, actionType, apiResultType } from '../components/Interfaces/AuthInterface';
import { AiFillWarning, AiOutlineArrowLeft } from 'react-icons/ai'
import { Poppins } from '@next/font/google';
import UserPic from '../public/images/authpage/people_5.webp'
import AuthContext from '../context/auth-context';

const poppins = Poppins({ weight: '400' });
const poppins_slim = Poppins({ weight: '300' });

const initialForm: loginFormType = {
    email: { value: '', valid: false },
    password: { value: '', valid: false },
    formValid: false,
}
const formReducer = (state: loginFormType, action: actionType) => {
    switch (action.type) {
        case 'Email':
            const emailValidity = checkEmailValidity(action.payload);
            return ({
                password: state.password,
                email: { value: action.payload, valid: emailValidity },
                formValid: (emailValidity && state.password['valid']),
            })
        case 'Password':
            const passwordValidity = action.payload.length >= 8;
            return ({
                email: state.email,
                password: { value: action.payload, valid: passwordValidity },
                formValid: (state.email['valid'] && passwordValidity),
            })
        default: throw new Error();
    }
}

const Login : NextPage = () => {
    const checkboxRef = useRef<HTMLInputElement>(null);
    const passwordInputRef = createRef<HTMLInputElement>();
    const [form, dispatchForm] = useReducer(formReducer, initialForm);
    const [warning, setWarning] = useState('');

    const ctx = useContext(AuthContext);

    const handleLogin = async (form: loginFormType) => {
        if (form.formValid) {
            const userData = {
                email: form.email['value'],
                password: form.password['value'],
            }
            await fetch('/api/auth/login', {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(userData),
            })
                .then(response => response.json())
                .then((data: apiResultType) => {
                    switch (data.result) {
                        case 0:
                            setWarning(data.message);
                            passwordInputRef.current!.value = '';
                            dispatchForm({ type: 'Password', payload: '' })
                            break;
                        case 1:
                            setWarning('');
                            ctx.setContext(true, form.email['value'])
                            break;
                    }
                })
                .catch(error => console.error(error))
        } else {
            setWarning('Please fill the form correctly');
        }
    }
    return (
        <div className={`${styles.container_main} ${poppins.className}`}>
            <div className={styles.wrapper}>
                <Link href='../' >
                    <AiOutlineArrowLeft className={styles.back_icon} />
                </Link>
                <div className={styles.container_credentials}>
                    <h1>Log in</h1>
                    <h3 className={poppins_slim.className}>Welcome back! Please enter your credentials</h3>
                    <span className={`${styles.credential_warning} ${!warning && styles.hidden}`}><AiFillWarning />{warning}</span>
                    <div className={styles.container_credential}>
                        <Input type='Email' name='Email' placeHolder='Enter your email address'
                            onChange={dispatchForm} invalid={!form.email['valid']} />
                        <Input type='Password' name='Password' placeHolder='Enter your password'
                            onChange={dispatchForm} invalid={!form.password['valid']} ref={passwordInputRef} />
                    </div>
                    <div className={styles.container_input}>
                        <input type='checkbox' ref={checkboxRef} />
                        <label className={styles.label} onClick={() => checkboxRef.current!.click()}>Remember me!</label>
                        <br />
                        <a href='#' className={`${styles.link} ${styles.margin_left_auto}`}>Forgot password</a>
                        <br />
                    </div>
                    <button className={styles.button} onClick={() => { handleLogin(form) }}>Sign in</button>
                    <div className={styles.container_signup}>Don't have an account? <Link href='/signup'
                        className={styles.link}>Sign up</Link></div>
                </div>
            </div>
            <div className={styles.wrapper}>
                <div className={styles.container_design}>
                    <Image src={UserPic} placeholder='blur' className={styles.userpic} alt='Picture of a happy customer'
                        quality={75} />
                </div>
            </div>
        </div >
    )
}

export default Login;