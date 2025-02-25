import React, { useState } from "react";
import Header from "../../components/Common/Header";
import { Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import Footer from "../../components/Common/Footer";
import fb from './assets/fb.png';


function Signup() {
    const [user, setUser] = useState({
        name: "",
        username: "",
        email: "",
        password: ""
    });
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showCPassword, setShowCPassword] = useState(false);
    const [isDisabled, setIsDisabled] = useState(false);
    const [nameIsValid, setNameIsValid] = useState(true);
    const [userNameIsValid, setUserNameIsValid] = useState(true);
    const [emailIsValid, setEmailIsValid] = useState(true);
    const [passwordIsValid, setPasswordIsValid] = useState(true);
    const [passwordIsMatch, setPasswordIsMatch] = useState(true);
    const toggleShow = (e) => {
        const { id } = e.target;
        if (id === "p") {
            setShowPassword(prev => !prev);
        } else {
            setShowCPassword(prev => !prev);
        }
    };
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
    const registerAccount = () => {
        fetch("http://localhost:3000/auth/register", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(res => {
                if (res.msg === "Registered successfully!") {
                    alert(res.msg);
                    window.location.href = "/login";
                }else{
                    alert(res.msg);
                }
            }
            );
    }
    const validation = () => {
        setIsDisabled(true);
        setEmailIsValid(true);
        setPasswordIsMatch(true);
        setPasswordIsValid(true);
        if (user.email !== "" || user.name !== "" || user.password !== "" || user.username !== "" || confirmPassword !== "") {
            if (user.name !== "") {
                setNameIsValid(true);
                if (user.username !== "") {
                    setUserNameIsValid(true);
                    const emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
                    if (user.email !== "" && user.email.match(emailFormat)) {
                        setEmailIsValid(true);
                        const pwFormat = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%^*?#&])[A-Za-z\d@$!%^*?#&]{8,}$/;
                        if (user.password !== "" && user.password.match(pwFormat)) {
                            if (user.password !== confirmPassword) {
                                setPasswordIsMatch(false);
                            } else {
                                setPasswordIsMatch(true);
                                registerAccount();
                            }
                        } else {
                            setPasswordIsValid(false);
                        }
                    } else {
                        setEmailIsValid(false);
                    }
                }
            } else {
                setNameIsValid(false);
            }
        } else {
            setNameIsValid(false);
        }
        setIsDisabled(false);
    }
    return (
        <>
            <Header />
            <div className="login-container">
                <div className="col-md-6 login-form-container">
                    <h2>Sign Up</h2>
                    <hr className="mb-4" />
                    <div className="row">
                        <Form className="login-form col-md-6">
                            <Form.Group className="mb-3">
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    required
                                    name="name"
                                    className={nameIsValid ? "" : "invalid-input"}
                                    type="text"
                                    placeholder="Jack"
                                    autoComplete="off"
                                    onChange={(e) => handleChange(e)}
                                />
                                {!nameIsValid && <p className="text-danger error-msg">Please enter a valid name</p>}
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Username</Form.Label>
                                <Form.Control
                                    required
                                    name="username"
                                    className={userNameIsValid ? "" : "invalid-input"}
                                    type="text"
                                    placeholder="dlwl33"
                                    autoComplete="off"
                                    onChange={(e) => handleChange(e)}
                                />
                                {!userNameIsValid && <p className="text-danger error-msg">Please enter a valid username</p>}
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    required
                                    name="email"
                                    className={emailIsValid ? "" : "invalid-input"}
                                    type="email"
                                    placeholder="asd123@gmail.com"
                                    autoComplete="off"
                                    onChange={(e) => handleChange(e)}
                                />
                                {!emailIsValid && <p className="text-danger error-msg">Please enter a valid email address</p>}
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Password</Form.Label>
                                <div className="password-container">
                                    <Form.Control
                                        required
                                        name="password"
                                        className={passwordIsValid ? "" : "invalid-input"}
                                        placeholder="Password"
                                        type={showPassword ? "text" : "password"}
                                        onChange={(e) => handleChange(e)}
                                    />
                                    <Button id="p" className={showPassword ? "passwordShown" : "passwordHidden"} onClick={(e) => toggleShow(e)} />
                                </div>
                                <Form.Text className="text-secondary">Password must contain 1 capital letter, 1 special character and, longer than 8 words</Form.Text>
                                {!passwordIsValid && <p className="text-danger error-msg">Please enter a valid password</p>}
                            </Form.Group>
                            <Form.Group className="mb-5">
                                <Form.Label>Confirm Password</Form.Label>
                                <div className="password-container">
                                    <Form.Control
                                        required
                                        name="cPassword"
                                        placeholder="Confirm Password"
                                        className={passwordIsMatch ? "" : "invalid-input"}
                                        type={showCPassword ? "text" : "password"}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                    />
                                    <Button id="c" className={showCPassword ? "passwordShown" : "passwordHidden"} onClick={(e) => toggleShow(e)} />
                                </div>
                                {!passwordIsMatch && <p className="text-danger error-msg">Passwords don't match</p>}
                            </Form.Group>
                            {isDisabled ?
                                <Button className="mb-2 disabled-btn">Sign up</Button>
                                :
                                <Button className="mb-2" onClick={validation}>Sign up</Button>
                            }
                            <p className="mb-5 other-link">Already signed up? <Link to={"/login"}>Log in</Link> here!</p>
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

export default Signup;