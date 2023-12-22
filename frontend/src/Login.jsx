import React, { useState } from "react";
import Header from "./Unregistered/Header";
import Footer from "./Unregistered/Footer";
import { Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import fb from './assets/fb.png';
import axios from "axios";

function Login() {
    axios.defaults.withCredentials = true;
    const [user, setUser] = useState({
        email: "",
        password: ""
    });
    const [isDisabled, setIsDisabled] = useState(false);
    const [isEmailValid, setIsEmailValid] = useState(true);
    const [isPasswordValid, setIsPasswordValid] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const login = () => {
        axios.post("http://localhost:3000/auth/login", {
            email: user.email,
            password: user.password
        }, { withCredentials: true })
            .then(res => {
                if (res.data.msg.startsWith("Welcome")) {
                    window.location.href = "/";
                } else if (res.data.msg.startsWith("Wrong")) {
                    setIsPasswordValid(false);
                } else {
                    setIsEmailValid(false);
                }
            })
    }
    const validation = () => {
        setIsDisabled(true);
        const emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (user.email !== "" && user.password !== "") {
            if (user.email.match(emailFormat)) {
                setIsEmailValid(true);
                setIsPasswordValid(true);
                login();
            } else {
                setIsEmailValid(false);
            }
        } else {
            if (user.email === "") {
                setIsEmailValid(false);
            } else if (user.password === "") {
                if (!user.email.match(emailFormat)) {
                    setIsEmailValid(false);
                } else{
                    setIsEmailValid(true);
                }
                setIsPasswordValid(false);
            };
        }
        setIsDisabled(false);
    }
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser(prev => {
            return (
                {
                    ...prev,
                    [name]: value
                }
            );
        });
    };

    const toggleShow = () => {
        setShowPassword(prev => !prev);
    };

    return (
        <>
            <Header />
            <div className="login-container">
                <div className="col-md-6 login-form-container">
                    <h2>Welcome!</h2>
                    <hr className="mb-4" />
                    <div className="row">
                        <Form className="col-md-6 login-form">
                            <Form.Group className="mb-3">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    required
                                    className={isEmailValid ? "" : "invalid-input"}
                                    name="email"
                                    type="email"
                                    placeholder="Enter your email..."
                                    onChange={(e) => handleChange(e)}
                                />
                                {!isEmailValid && <p className="text-danger error-msg">Please enter a valid email</p>}
                            </Form.Group>
                            <Form.Group className="mb-4">
                                <Form.Label>Password</Form.Label>
                                <div className="password-container">
                                    <Form.Control
                                        required
                                        name="password"
                                        className={isPasswordValid ? "" : "invalid-input"}
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Enter your password..."
                                        onChange={(e) => handleChange(e)}
                                    />
                                    <Button className={showPassword ? "passwordShown" : "passwordHidden"} onClick={toggleShow} />
                                </div>
                                {!isPasswordValid && <p className="text-danger error-msg">Please enter a valid password</p>}
                            </Form.Group>
                            {isDisabled ? <Button className="mb-2 disabled-btn">Log In</Button>
                                : <Button className="mb-2" onClick={validation}>Log In</Button>}
                            <p className="mb-5 other-link">New member? <Link to={"/signup"}>Sign up</Link> here!</p>
                        </Form>
                        <div className="col-md-6 mt-4 easy-login-btn-group">
                            <Link className="col-md-12 mb-4"><img src={fb} alt="" />Continue with Facebook</Link>
                            <Link className="col-md-12 mb-4"><img src={fb} alt="" />Continue with Facebook</Link>
                            <Link className="col-md-12 mb-4"><img src={fb} alt="" />Continue with Facebook</Link>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Login;