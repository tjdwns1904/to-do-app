import { MouseEvent, useState } from "react";
import Header from "@/components/Common/Header";
import { Button, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Footer from "@/components/Common/Footer";
import { useSignup } from "@/services/useSignup";
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import IMAGES from "@/assets/images/images";

const EMAIL_FORMAT = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const PASSWORD_FORMAT = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%^*?#&])[A-Za-z\d@$!%^*?#&]{8,}$/;

const schema = z.object({
    name: z.string()
        .min(1, "Please enter a valid name"),
    username: z.string()
        .min(1, "Please enter a valid username"),
    email: z.string()
        .min(1, "Please enter a valid email address")
        .regex(EMAIL_FORMAT, "Please enter a valid email address"),
    password: z.string()
        .regex(PASSWORD_FORMAT, "Please enter a valid password"),
    passwordConfirm: z.string()
}).refine(schema => schema.password === schema.passwordConfirm, {
    message: "Passwords don't match",
    path: ["passwordConfirm"]
});

export type SignupForm = z.infer<typeof schema>;

function Signup() {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(schema)
    })
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [showCPassword, setShowCPassword] = useState(false);
    const toggleShow = (e: MouseEvent<HTMLButtonElement>) => {
        const { id } = e.currentTarget;
        if (id === "p") {
            setShowPassword(prev => !prev);
        } else {
            setShowCPassword(prev => !prev);
        }
    };
    const { mutate: signup } = useSignup({
        onSuccess: (data) => {
            if (data.msg === "Registered successfully!") {
                alert(data.msg);
                navigate("/login", { replace: true });
            } else {
                alert(data.msg);
            }
        },
        onError: () => {
            console.log("Error");
        }
    })
    const registerAccount = (user: SignupForm) => {
        console.log(user);
        signup(user);
    }
    return (
        <>
            <Header />
            <div className="login-container">
                <div className="col-lg-4 col-md-5 login-form-container">
                    <h2>Sign Up</h2>
                    <hr className="mb-4" />
                    <Form className="login-form" onSubmit={handleSubmit(registerAccount)}>
                        <Form.Group className="mb-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                required
                                className={errors.name ? "invalid-input" : ""}
                                type="text"
                                placeholder="Jack"
                                autoComplete="off"
                                {...register("name")}
                            />
                            {errors.name && <p className="text-danger error-msg">{errors.name.message}</p>}
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                required
                                className={errors.username ? "invalid-input" : ""}
                                type="text"
                                placeholder="dlwl33"
                                autoComplete="off"
                                {...register("username")}
                            />
                            {errors.username && <p className="text-danger error-msg">{errors.username.message}</p>}
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                required
                                className={errors.email ? "invalid-input" : ""}
                                type="email"
                                placeholder="asd123@gmail.com"
                                autoComplete="off"
                                {...register("email")}
                            />
                            {errors.email && <p className="text-danger error-msg">{errors.email.message}</p>}
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Password</Form.Label>
                            <div className="password-container">
                                <Form.Control
                                    required
                                    className={errors.password ? "invalid-input" : ""}
                                    placeholder="Password"
                                    type={showPassword ? "text" : "password"}
                                    {...register("password")}
                                />
                                <Button id="p" className={showPassword ? "passwordShown" : "passwordHidden"} onClick={(e) => toggleShow(e)} />
                            </div>
                            <Form.Text className="text-secondary">Password must contain 1 capital letter, 1 special character and, longer than 8 words</Form.Text>
                            {errors.password && <p className="text-danger error-msg">{errors.password.message}</p>}
                        </Form.Group>
                        <Form.Group className="mb-5">
                            <Form.Label>Confirm Password</Form.Label>
                            <div className="password-container">
                                <Form.Control
                                    required
                                    placeholder="Confirm Password"
                                    className={errors.passwordConfirm ? "invalid-input" : ""}
                                    type={showCPassword ? "text" : "password"}
                                    {...register("passwordConfirm")}
                                />
                                <Button id="c" className={showCPassword ? "passwordShown" : "passwordHidden"} onClick={(e) => toggleShow(e)} />
                            </div>
                            {errors.passwordConfirm && <p className="text-danger error-msg">{errors.passwordConfirm.message}</p>}
                        </Form.Group>
                        <Button className="mb-2" type="submit">Sign up</Button>
                        <p className="mb-5 other-link">Already signed up? <Link to={"/login"}>Log in</Link> here!</p>
                    </Form>
                    <div>
                        <p className="line-text text-secondary fs-6"><span>Or With</span></p>
                        <div className="d-flex justify-content-between mt-4 easy-login-btn-group">
                            <Button className="me-2"><img src={IMAGES.google} alt="" />Google</Button>
                            <Button className="ms-2"><img src={IMAGES.fb} alt="" />Facebook</Button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Signup;