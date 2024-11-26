import { Button, Col, Form, Row } from "react-bootstrap"
import { useFormik } from "formik"
import * as Yup from "yup"
import { InputField, SubmitBtn } from "../../../components"
import { useState } from "react"
import http from "../../../http"

export const Login = () => {
    const [remember, setRemember] = useState(false)

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            email: Yup.string().required().email(),
            password: Yup.string().required(),
        }),
        onSubmit: (data, {setSubmitting}) => {
            http.post('/auth/login', data)
                .then(data => console.log(data))
                .catch(error => console.log(error))
                .finally(() => setSubmitting)
        }
    })

    return <Row>
        <Col lg="4" className="bg-white py-3 my-5 mx-auto rounded-2 shadow-sm">
            <Row>
                <Col className="text-center">
                    <h1>Login</h1>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form onSubmit={formik.handleSubmit}>
                        <InputField formik={formik} name="email" label="Email" type="email" />
                        
                        <InputField formik={formik} name="password" label="Password" type="password" />
                        
                        <div className="mb-3">
                            <Form.Check>
                                <Form.Check.Input name="remember" id="remember" value={true} checked={remember} onClick={() => setRemember(!remember)} />
                                <Form.Check.Label htmlFor="remember">Remember Me</Form.Check.Label>
                            </Form.Check>
                        </div>
                        <div className="d-grid">
                            <SubmitBtn disabled={formik.isSubmitting} icon="fa-arrow-right-to-bracket" label="Log In" />
                        </div>
                    </Form>
                </Col>
            </Row>
        </Col>
    </Row>
}