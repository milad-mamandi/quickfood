import styles from '../styles/Auth.module.css'
import { useReducer, useState, createRef } from 'react';
import { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Input from "../components/UI/Input";
import { checkEmailValidity, checkPasswordStrength } from '../components/Tools/ValidtyCheck';
import { registerFormType, actionType, apiResultType } from '../components/Interfaces/AuthInterface';
import Progressbar from '../components/UI/Strengthbar';
import { AiFillWarning, AiOutlineArrowLeft } from 'react-icons/ai'
import { Poppins } from '@next/font/google';
import UserPic from '../public/images/authpage/people_1.webp'

const poppins = Poppins({ weight: '400' });
const poppins_slim = Poppins({ weight: '300' });

const initialForm: registerFormType = {
    name: '',
    email: { value: '', valid: false },
    password: { value: '', strength: 0 },
    formValid: false
}
const reducerForm = (state: registerFormType, action: actionType) => {
    switch (action.type) {
        case 'Name':
            return ({
                ...state,
                name: action.payload
            })
        case 'Email':
            const emailValidity = checkEmailValidity(action.payload);
            return ({
                ...state,
                email: { value: action.payload, valid: emailValidity },
                formValid: (emailValidity && state.password['strength'] > 2)
            })
        case 'Password':
            const passwordStrength = checkPasswordStrength(action.payload);
            return ({
                ...state,
                password: { value: action.payload, strength: passwordStrength },
                formValid: (state.email['valid'] && passwordStrength > 2)
            })
        default: throw new Error();
    }
}
const Signup : NextPage = () => {
    const [form, dispatchForm] = useReducer(reducerForm, initialForm);
    const [agreement, setAgreement] = useState(false);
    const [warning, setWarning] = useState('');
    const emailInputRef = createRef<HTMLInputElement>();

    const handleSignup = async (form: registerFormType) => {
        if (form.formValid && agreement) {
            const userData = {
                name: form.name,
                email: form.email['value'],
                password: form.password['value'],
            }
            await fetch('/api/auth/signup', {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(userData),
            })
                .then(response => response.json())
                .then((data: apiResultType) => {
                    switch (data.result) {
                        case 0:
                            setWarning(data.message);
                            emailInputRef.current!.value = '';
                            dispatchForm({ type: 'Email', payload: '' })
                            break;
                        case 1:
                            setWarning('');
                            break;
                    }
                })
                .catch(error => console.error(error))
        } else {
            if (!form.formValid) {
                setWarning('Please fill the form correctly');
            } else {
                setWarning('You did not agree to terms of use');
            }
        }
    }
    return (
        <div className={`${styles.container_main} ${poppins.className}`}>
            <div className={styles.wrapper}>
                <Link href='../' >
                    <AiOutlineArrowLeft className={styles.back_icon} />
                </Link>
                <div className={styles.container_credentials}>
                    <h1>Sign up</h1>
                    <h3 className={poppins_slim.className}>Use the full functionality of the website by registering</h3>
                    <span className={`${styles.credential_warning} ${!warning && styles.hidden}`}><AiFillWarning />{warning}</span>
                    <div className={styles.container_credential}>
                        <Input type='Text' name='Name' placeHolder='Enter your full name' onChange={dispatchForm} />
                        <Input type='Email' name='Email' placeHolder='Example@site.com'
                            onChange={dispatchForm} invalid={!form.email['valid']} ref={emailInputRef} />
                        <Input type='Password' name='Password' placeHolder='At least 8 characters'
                            onChange={dispatchForm} invalid={form.password['strength'] < 2} />
                        <Progressbar progress={form.password['strength']} />
                    </div>
                    <div className={styles.container_input}>
                        <input className={styles.checkbox} type='checkbox' onChange={e => setAgreement(e.currentTarget.checked)} />
                        <label className={`${styles.label} ${styles.margin_left_16}`}>
                            By creating an account you agree to the <a href='#' className={`${styles.link} ${styles.underline}`}>
                                terms of use</a> and our <a href='#' className={`${styles.link} ${styles.underline}`}>privacy policy</a>
                        </label>
                        <br />
                    </div>
                    <button className={styles.button} onClick={() => handleSignup(form)}>Sign up</button>
                    <div className={styles.container_signup}>Already have an account? <Link href='/login'
                        className={styles.link}>Log in</Link></div>
                </div>
            </div>
            <div className={styles.wrapper}>
                <div className={styles.container_design}>
                    <Image priority={false} placeholder='blur' className={styles.userpic} src={UserPic} alt='Picture of a happy user'
                        quality={75} />
                </div>
            </div>
        </div>
    )
}

export default Signup;