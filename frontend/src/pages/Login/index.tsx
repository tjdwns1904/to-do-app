import { useEffect, useState } from "react";
import Header from "@/components/Common/Header";
import Footer from "@/components/Common/Footer";
import { Button, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import IMAGES from "@/assets/images/images";
import { useLogin } from "../../services/useLogin";
import { useGetUser } from "@/hooks/useGetUser";
import { useSessionStorage } from "@uidotdev/usehooks";
import { INITIAL_USER_VALUE } from "@/utils/storage_const";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from 'react-hook-form';


const EMAIL_FORMAT = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const schema = z.object({
    email: z.string()
        .regex(EMAIL_FORMAT, "Please enter a valid email"),
    password: z.string()
        .min(1, "Please enter a valid password"),
});

export type LoginForm = z.infer<typeof schema>;

function Login() {
    const navigate = useNavigate();
    const [isEmailValid, setIsEmailValid] = useState(true);
    const [isPasswordValid, setIsPasswordValid] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(schema),
    });
    const [_, setUser] = useSessionStorage("user", INITIAL_USER_VALUE);
    const { data: user, refetch: getUser, isSuccess: isGetUserSuccess } = useGetUser({
        queryKey: [],
        enabled: false,
    });
    const { mutate: login } = useLogin({
        onSuccess: (data) => {
            if (data.msg === "Welcome") {
                getUser();
            } else if (data.msg === "Email not registered! Please try again...") {
                setIsEmailValid(false);
            } else {
                setIsPasswordValid(false);
            }
        },
        onError: () => {
            console.log("Error");
        }
    });
    const handleLogin = (user: LoginForm) => {
        login(user);
    }

    const toggleShow = () => {
        setShowPassword(prev => !prev);
    };

    useEffect(() => {
        if (isGetUserSuccess && user.isLoggedIn) {
            setUser({ ...user.user[0], isLoggedIn: user.isLoggedIn });
            navigate("/", { replace: true });
            return;
        }
    }, [isGetUserSuccess, user, navigate]);

    return (
        <>
            <Header />
            <div className="login-container">
                <div className="col-md-6 login-form-container">
                    <h2>Welcome!</h2>
                    <hr className="mb-4" />
                    <div className="row">
                        <Form className="col-md-6 login-form" onSubmit={handleSubmit(handleLogin)}>
                            <Form.Group className="mb-3">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    required
                                    className={errors.email || !isEmailValid ? "invalid-input" : ""}
                                    type="email"
                                    placeholder="Enter your email..."
                                    {...register("email")}
                                />
                                {errors.email && <p className="text-danger error-msg">{errors.email.message}</p>}
                            </Form.Group>
                            <Form.Group className="mb-4">
                                <Form.Label>Password</Form.Label>
                                <div className="password-container">
                                    <Form.Control
                                        required
                                        className={errors.password || !isPasswordValid ? "invalid-input" : ""}
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Enter your password..."
                                        {...register("password")}
                                    />
                                    <Button className={showPassword ? "passwordShown" : "passwordHidden"} onClick={toggleShow} />
                                </div>
                                {errors.password && <p className="text-danger error-msg">{errors.password.message}</p>}
                            </Form.Group>
                            <Button className="mb-2" type="submit">Log In</Button>
                            <p className="mb-5 other-link">New member? <Link to={"/signup"}>Sign up</Link> here!</p>
                        </Form>
                        <div className="col-md-6 mt-4 easy-login-btn-group">
                            <Button className="col-md-12 mb-4"><img src={IMAGES.fb} alt="" />Continue with Google</Button>
                            <Button className="col-md-12 mb-4"><img src={IMAGES.fb} alt="" />Continue with Facebook</Button>
                            <Button className="col-md-12 mb-4"><img src={IMAGES.fb} alt="" />Continue with Facebook</Button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Login;