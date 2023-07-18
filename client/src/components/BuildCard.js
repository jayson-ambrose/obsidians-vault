import React ,{ useState, useEffect } from 'react'
import '../styles/App.css'
import CardList from './CardList'
import { Form, Input, Checkbox, TextArea, Button } from 'semantic-ui-react'

import { useFormik } from 'formik'
import * as yup from 'yup'

function BuildCard () {

    const [cards, setCards] = useState([])

    useEffect(() => {
        fetch('/cards')
        .then(resp => resp.json())
        .then(data => setCards(data))
    }, [])

    const formSchema = yup.object().shape({
        name: yup.string().required('Must enter card name.'),
        cost: yup.number().required('Must enter card cost'),
        img_url: yup.string().required('Must enter image URL'),
        text: yup.string().required('Must enter card rules text.'),
        colors: yup.object().shape({
            blue: yup.boolean(),
            red: yup.boolean(),
            green: yup.boolean(),
            purple: yup.boolean()
        }),
        keywords: yup.object().shape({
            cancel: yup.boolean(),
            collect: yup.boolean(),
            destroy: yup.boolean(),
            discarded: yup.boolean(),
            draw: yup.boolean(),
            expansion: yup.boolean(),
            remove: yup.boolean(),
            renews: yup.boolean()
        })
    })

    const formik = useFormik({
        initialValues: {
            name: "",
            cost: "",
            img_url: "",
            text:"",
            colors: {
                blue: false,
                red: false,
                green: false,
                purple: false
            },
            keywords: {
                cancel: false,
                collect: false,
                destroy: false,
                discarded: false,
                draw: false,
                expansion: false,
                remove: false,
                renews: false,
            }
        },

        validationSchema: formSchema,

        onSubmit: (values, {resetForm}) => {
            handleBuildCard(values)
            resetForm()
        }
    })

    const handleBuildCard = (formValues) => {
        fetch('/cards', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formValues)
        })
        .then(resp => {
            if(resp.ok) {
                resp.json().then(data => {
                    setCards([...cards, data])
                })
            }
        })
    }
    
    return(
        <div className='adminPanelContent'>
            <h2>Card Details</h2>
            <Form className='stacked' onSubmit={formik.handleSubmit}>
                <div className='stacked'>
                    <Input
                        name='name'
                        placeholder='Card Name'
                        autoComplete='off'
                        onChange={formik.handleChange}
                        value={formik.values.name}/>
                    <Input 
                        name='cost'
                        placeholder='Card Cost'
                        autoComplete='off'
                        onChange={formik.handleChange}
                        value={formik.values.cost}/>
                    <Input
                        name='img_url'
                        placeholder='Image URL'
                        autoComplete='off'
                        onChange={formik.handleChange}
                        value={formik.values.img_url}/>
                    <TextArea
                        name='text'
                        placeholder='Rules Text'
                        autoComplete='off'
                        onChange={formik.handleChange}
                        value={formik.values.text}/>
                </div>
                <div className='stacked'>
                    <h2>Colors</h2>
                    <Checkbox
                        id='colors.blue'               
                        label='Blue'                         
                        onChange={formik.handleChange}
                        checked={formik.values.colors.blue}/>
                    <Checkbox 
                        id='colors.red' 
                        label='Red'
                        onChange={formik.handleChange}
                        checked={formik.values.colors.red}/>
                    <Checkbox 
                        id='colors.green' 
                        label='Green'
                        onChange={formik.handleChange}
                        checked={formik.values.colors.green}/>
                    <Checkbox 
                        id='colors.purple' 
                        label='Purple'
                        onChange={formik.handleChange}
                        checked={formik.values.colors.purple}/>
                </div>
                <div className='stacked'>
                    <h2>Keywords</h2>
                    <Checkbox 
                        id='keywords.cancel' 
                        label='Cancel'
                        onChange={formik.handleChange}
                        checked={formik.values.keywords.cancel}/>
                    <Checkbox 
                        id='keywords.collect' 
                        label='Collect'
                        onChange={formik.handleChange}
                        checked={formik.values.keywords.collect}/>
                    <Checkbox 
                        id='keywords.destroy' 
                        label='Destroy'
                        onChange={formik.handleChange}
                        checked={formik.values.keywords.destroy}/>
                    <Checkbox 
                        id='keywords.discarded' 
                        label='Discarded'
                        onChange={formik.handleChange}
                        checked={formik.values.keywords.discarded}/>
                    <Checkbox 
                        id='keywords.draw' 
                        label='Draw'
                        onChange={formik.handleChange}
                        checked={formik.values.keywords.draw}/>
                    <Checkbox 
                        id='keywords.expansion' 
                        label='Expansion'
                        onChange={formik.handleChange}
                        checked={formik.values.keywords.expansion}/>
                    <Checkbox 
                        id='keywords.remove' 
                        label='Remove'
                        onChange={formik.handleChange}
                        checked={formik.values.keywords.remove}/>
                    <Checkbox 
                        id='keywords.renews' 
                        label='Renews'
                        onChange={formik.handleChange}
                        checked={formik.values.keywords.renews}/>
                </div>
                <Button inverted color='yellow' type='submit'> Submit Card</Button>
            </Form>
            <CardList cards={cards} />
        </div>       
    )
}

export default BuildCard