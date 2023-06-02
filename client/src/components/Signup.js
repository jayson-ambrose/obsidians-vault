import React from 'react'
import '../styles/App.css'
import { Form, Input, Button } from 'semantic-ui-react'
import { useHistory } from 'react-router-dom'

import { FormikContext, useFormik } from 'formik'
import * as yup from 'yup'
import { useSetRecoilState } from 'recoil'
import { loggedInAtom, activeAccountAtom } from './lib/atoms'

function Signup () {

    const history = useHistory()

    const setActiveAccount = useSetRecoilState(activeAccountAtom)
    const setLoggedIn = useSetRecoilState(loggedInAtom)   

    const formSchema = yup.object().shape({
        username: yup.string().required('Must enter username.').max(15).min(4),
        password: yup.string().required('Must enter password.').max(30).min(6),
        re_password: yup.string().required('Must re-enter password')
    })

    const formik = useFormik({
        initialValues: {
            username: "",
            password: "",
            re_password: ""
        },

        validationSchema: formSchema,

        onSubmit: (values, {resetForm}) => {
            handleSignup(values)
            resetForm()
        }
    })

    const handleSignup = (formValues) => {

        fetch('/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formValues)
        })
        .then(resp => {
            if(resp.ok) {
                resp.json().then(data => {
                    setActiveAccount(data)
                    setLoggedIn(true)
                    history.push('/')
                })
            }
        })
    }
    
    return(
        <div className='content'>
            <h2>Create Account</h2>            
            <Form className='stacked' onSubmit={formik.handleSubmit}>
                <Input
                    name='username' 
                    placeholder='Username'
                    onChange={formik.handleChange} 
                    value={formik.values.username}/>
                <Input 
                    name='password'
                    type='password' 
                    placeholder='Password' 
                    onChange={formik.handleChange}
                    value={formik.values.password}/>
                <Input
                    name='re_password'
                    type='password' 
                    placeholder='Re-enter Password' 
                    onChange={formik.handleChange}
                    value={formik.values.re_password}/>
                <Button type='submit' className='loginButton' inverted color='yellow'> Sign-up </Button>
            </Form>
        </div>       
    )
}

export default Signup