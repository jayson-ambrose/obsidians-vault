import React, { useState } from 'react'
import '../styles/App.css'
import { Modal, Button, Header, Input, Form } from 'semantic-ui-react'

function Login () {  

    const [loginOpen, setLoginOpen] = useState(false)
    const [userText, setUserText] = useState('')
    const [passText, setPassText] = useState('')

    const handleLogin = (e) => {
        e.preventDefault()
        setLoginOpen(false)
    }

    const handleUserText = (e) => {
        setUserText(e.target.value)
    }

    const handlePassText = (e) => {
        setPassText(e.target.value)
    }

    return(
        <div>
            <Modal
                onClose={() => setLoginOpen(false)}
                onOpen={() => setLoginOpen(true)}
                open={loginOpen}
                trigger={<Button inverted color='yellow'>Login / Create Account</Button>}
            >
                <Modal.Header>Login</Modal.Header>
                <Modal.Content>
                    <div className='stacked'>
                        <Form id='loginEntry' onSubmit={(e) => handleLogin(e)}>
                            <Input type='text' placeholder='Username' onChange={(e) => handleUserText(e)} value={userText}/>
                            <Input type='password' placeholder='Password' onChange={(e) => handlePassText(e)} value={passText}/>
                            <Button secondary type='submit'> Login </Button>                
                        </Form>
                        <p>Create Account</p>
                    </div>   
                </Modal.Content>
            </Modal>
        </div>       
    )
}

export default Login

// return(
//     <div className='stacked'>
//         <form id='loginEntry' onSubmit={(e) => handleLogin(e)}>
//             <Input type='text' placeholder='Username'/>
//             <Input type='text' placeholder='Password'/>
//             <Button primary type='submit'> Login </Button>                
//         </form>
//         <p>Create Account</p>
//     </div>       
// )