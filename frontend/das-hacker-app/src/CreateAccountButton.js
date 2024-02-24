// CreateAccountButton.js
import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const CreateAccountButton = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const auth = getAuth();

    const createAccount = async () => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            console.log('Account created:', userCredential.user);
            alert('Account created successfully!');
        } catch (error) {
            console.error("Error creating account:", error.message);
            alert('Account creation failed: ' + error.message);
        }
    };

    return (
        <div>
            <label>
                Email:
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </label>
            <label>
                Password:
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </label>
            <button onClick={createAccount}>Create Account</button>
        </div>
    );
};

export default CreateAccountButton;
