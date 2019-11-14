import React from 'react';
import { withFormik, Form, Field } from 'formik';
import * as Yup from 'yup';


const MyForm = ({values}) => {
    return (
    <div className="my-form">
        <Form>
            <Field type="text" name="name" placeholder="name"/>
            <Field type="text" name="email" placeholder="email"/>
            <Field type="text" name="password" placeholder="password"/>
            <label className="checkbox-container">
                Terms of Service
                <Field type="checkbox" name="terms" checked={values.terms} />
                <span className="checkmark"/>
            </label>
            <button type="submit">Submit</button>
        </Form>
    </div>
    )
}
    const FormikMyForm = withFormik({
        mapPropsToValues({ name, email, password, terms }) {
        return {
            terms: terms || false,  //checks or unchecks 
            name: name || "",
            email: email || "",
            password: password || "",
        };
    },
    validationSchema:Yup.object().shape(
        {name: Yup.string().required()})
    })(MyForm);   
        
export default MyForm;        


