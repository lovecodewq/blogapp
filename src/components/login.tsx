import React, { useState } from 'react';
import service from '../appwrite/service';

const Login = () => {
    const [loggedInUser, setLoggedInUser] = useState(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    async function login(email: string, password: string): Promise<any> {
        await service.login({ email, password });
        setLoggedInUser(await service.getCurrentUser());

        console.log("debug list documents");
        const res = await service.listDocuments();
        console.log(res);
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
                        service.createAccount({ email, password, name });
                    }}
                >
                    Register
                </button>

                <button
                    type="button"
                    onClick={async () => {
                        service.logout();
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
