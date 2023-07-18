import React, { useState } from 'react'
import { Modal, Button, Input, Form } from 'semantic-ui-react'
import { useHistory } from 'react-router-dom'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { loggedInAtom, activeAccountAtom  } from './lib/atoms'

function Login () {  

    const [loginOpen, setLoginOpen] = useState(false)
    const [userText, setUserText] = useState('')
    const [passText, setPassText] = useState('')

    const history = useHistory()

    const [loggedIn, setLoggedIn] = useRecoilState(loggedInAtom)
    const setActiveAccount = useSetRecoilState(activeAccountAtom)

    const handleLogin = (e) => {
        e.preventDefault()

        const credentials = {username: userText, password: passText}

        fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        })
        .then(resp => {
            if(resp.ok) {
                resp.json().then(data => {
                    setUserText('')
                    setPassText('')
                    setActiveAccount(data)
                    setLoggedIn(true)
                    history.push('/')
                })
            } else {
                console.log(resp)
            }
        })

        setLoginOpen(false)
    }

    const handleLogout = () => {
        fetch('/logout', {
            method: 'DELETE'
        })
        .then(resp => {
            if (resp.ok) {
                setLoggedIn(false)
                setActiveAccount(null)
            }
        })
    }

    const handleUserText = (e) => {
        setUserText(e.target.value)
    }

    const handlePassText = (e) => {
        setPassText(e.target.value)
    }

    return(
        <div>
            { loggedIn ? 
            <Button onClick={() => handleLogout()}>Logout</Button> :
            <Modal
                basic
                className='myModal'
                onClose={() => setLoginOpen(false)}
                onOpen={() => setLoginOpen(true)}
                open={loginOpen}
                trigger={<Button inverted color='yellow'>Login</Button>}                
            >
                <Modal.Header>Login</Modal.Header>
                <Modal.Content>
                    <Form id='loginEntry' onSubmit={(e) => handleLogin(e)}>
                        <div className='stacked'>
                            <Input type='text' placeholder='Username' onChange={(e) => handleUserText(e)} value={userText}/>
                            <Input type='password' placeholder='Password' onChange={(e) => handlePassText(e)} value={passText}/>
                        </div>
                        <div className='stacked'>
                            <Button className='loginButton' inverted color='yellow' type='submit'> Login </Button>
                        </div>                
                    </Form>
                </Modal.Content>
            </Modal>}
        </div>       
    )
}

export default Login