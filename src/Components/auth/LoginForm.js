import React, {useState} from 'react';
import dataManager from '../../modules/dataManager'

const LoginForm = props => {
    const [credentials, setCredentials] = useState({username:"", password: ""})

    const handleSettingCredentials = event => {
        const stateToChange = {...credentials};
        stateToChange[event.target.id] = event.target.value;
        setCredentials(stateToChange);
    };

    const handleLogin = event => {
        event.preventDefault();

        if (credentials.username === "" || credentials.password === "") {
            window.alert('Please complete all fields');
        } else {
            dataManager.getUsername(credentials.username)
                .then(userArr => {
                    if (userArr.length < 0) {
                        window.alert('Username does not exist')
                    } else if (credentials.password !== userArr[0].password) {
                        window.alert('Incorrect password')
                    } else {
                        props.setUser(credentials)
                    }
                })
        }
    }

return (
    <>
        <form>
            <label htmlFor='username'>Username </label>
            <input onChange={handleSettingCredentials} type='text' id='username' />

            <label htmlFor='password'>Password </label>
            <input onChange={handleSettingCredentials} type='text' id='password' />

            <button type='submit' id='sign-up' onClick={handleLogin}>Log in</button>
            <button id='cancel' onClick={props.toggleModal}>Cancel</button>
        </form>
    </>
)
}

export default LoginForm