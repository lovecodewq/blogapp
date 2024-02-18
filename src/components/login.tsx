import React, { useState } from 'react';
import authService from '../appwrite/auth';

const Login = () => {
    const [loggedInUser, setLoggedInUser] = useState(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    async function login( email:string, password:string ):Promise<any> {
        await authService.login({ email, password });
        setLoggedInUser(await authService.getCurrentUser());
    };
    return (
        <div>
            <p>
                {loggedInUser ? `Logged in as ${loggedInUser.name}` : 'Not logged in'}
            </p>

            <form>
                <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
                <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
                <input type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} />

                <button type="button" onClick={() => login(email, password)}>
                    Login
                </button>

                <button
                    type="button"
                    onClick={async () => {
                        authService.createAccount({ email, password, name });
                    }}
                >
                    Register
                </button>

                <button
                    type="button"
                    onClick={async () => {
                        authService.logout();
                        setLoggedInUser(null);
                    }}
                >
                    Logout
                </button>
            </form>
        </div>
    );
};

export default Login;
