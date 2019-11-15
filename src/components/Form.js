import React, {useState, useEffect } from 'react';
import { withFormik, Form, Field } from 'formik';
import * as Yup from 'yup';
import Axios from 'axios';


const MyForm = ({values, errors, touched, status }) => {
    const [profile, setProfile] = useState([]);

    useEffect( () => {
        status && setProfile(profile => [...profile, status]);
    }, [status]);

    return (
    <div className="my-form">
        <h2>Sign Up!</h2>
        <Form className="main">
            <label>Full Name: <Field type="text" name="name" placeholder="name"/></label>
            {touched.name && errors.name && 
                <p className="errors">{errors.name}</p>
            }
            <label>Email: <Field type="email" name="email" placeholder="email"/></label>
            {touched.email && errors.email && 
                <p className="errors">{errors.email}</p>
            }
            <label> User Name: <Field type="text" name="userName" placeholder="userName"/></label>
            <label>Password: <Field type="password" name="password" placeholder="password"/></label>
            {touched.password && errors.password && 
                <p className="errors">{errors.password}</p>
            }
            <label className="checkbox-container">
                Terms of Service
                <Field type="checkbox" name="terms" checked={values.terms}/>
                <span className="checkmark"/>
            </label>
            <button type="submit">Submit</button>
        </Form>
        {profile.map(profiles => (
            <ul key={profiles.id}>
                <li>Full Name: {profiles.name}</li>
                <li>Email: {profiles.email}</li>
                <li>UserName: {profiles.userName}</li>
                <li>Password: {profiles.password}</li>
            </ul>
        ))}
    </div>
    );
};

const FormikMyForm = withFormik({
    mapPropsToValues({ name, email, userName, password, terms }) {
        return {
            name: name || "",
            email: email || "",
            userName: userName || "",
            password: password || "",
            terms: terms || false
        };
    },

    validationSchema: Yup.object().shape({
        name: Yup.string().required(),
        email: Yup.string().email('Please enter a valid email').required('Please enter an email'),
        password: Yup.string().min(8).max(16).required()
        }),

    handleSubmit(values, { setStatus}) {
        Axios.post("https://reqres.in/api/users/", values)
        .then(response => {
            setStatus(response.data);
            console.log(response);
        })
        .catch(error => console.log(error.response));
    }
})(MyForm);   
    
export default FormikMyForm; 



