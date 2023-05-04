import { useState } from "react";
import { signInWithGooglePopup, createUserDocumentFromAuth, signInAuthUserWithEmailAndPassword } from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component"
import Button from "../button/button.component";

import './sign-in-form.styles.scss'

const defaultFormFields = {
    email: '',
    password: ''
}

const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value })
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const res = await signInAuthUserWithEmailAndPassword(email, password)
            console.log(res);
            resetFormFields();
        } catch (err) {
            switch (err.code) {
                case 'auth/wrong-password':
                    alert("incorrect password")
                    break
                case 'auth/user/not-found':
                    alert('No user associated with this email')
                    break;
                default:
                    console.log(err)
            }
        }
    }

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const signInWithGoole = async () => {
        const { user } = await signInWithGooglePopup();
        await createUserDocumentFromAuth(user);
    }

    return (
        <div>
            <h2>Already have an account?</h2>
            <span>Sign in with your email and password</span>
            <form className="sign-in-container" onSubmit={handleSubmit}>
                <FormInput
                    label="Email"
                    type='email'
                    required
                    onChange={handleChange}
                    name='email'
                    value={email}
                />
                <FormInput
                    label="Password"
                    type="password"
                    required
                    onChange={handleChange}
                    name='password'
                    value={password}
                />
                <div className="buttons-container">
                    <Button type="submit">Sign In</Button>
                    <Button type='button' buttonType="google" onClick={signInWithGoole}>Google Sign In</Button>
                </div>
            </form>
        </div>
    );
}

export default SignInForm;