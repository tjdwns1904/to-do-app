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
import { useForm } from "react-hook-form";

const EMAIL_FORMAT = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const schema = z.object({
  email: z.string().regex(EMAIL_FORMAT, "Please enter a valid email"),
  password: z.string().min(1, "Please enter a valid password"),
});

export type LoginForm = z.infer<typeof schema>;

function Login() {
  const navigate = useNavigate();
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });
  const [_, setUser] = useSessionStorage("user", INITIAL_USER_VALUE);
  const {
    data: user,
    refetch: getUser,
    isSuccess: isGetUserSuccess,
  } = useGetUser({
    queryKey: [],
    enabled: false,
  });
  const { mutate: login } = useLogin({
    onSuccess: (data) => {
      if (data.msg === "Welcome") {
        getUser();
      } else {
        setIsEmailValid(false);
        setIsPasswordValid(false);
      }
    },
    onError: () => {
      console.log("Error");
    },
  });
  const handleLogin = (user: LoginForm) => {
    login(user);
  };

  const toggleShow = () => {
    setShowPassword((prev) => !prev);
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
      <div className="h-fit bg-[#F9F2ED] py-[100px]">
        <div className="col-lg-4 col-md-5 mx-auto px-[40px] py-[10px] text-center">
          <h2 className="py-[10px] !text-[36px] !font-bold">Login</h2>
          <hr className="mb-4" />
          <Form className="text-start" onSubmit={handleSubmit(handleLogin)}>
            <Form.Group className="mb-3">
              <Form.Label className="text-[#4e4e4e]">Email</Form.Label>
              <Form.Control
                required
                className={
                  errors.email || !isEmailValid ? "!border-red-500" : ""
                }
                type="email"
                placeholder="Enter your email..."
                {...register("email")}
              />
              {errors.email && (
                <p className="text-danger !text-[12px]">
                  {errors.email.message}
                </p>
              )}
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Label className="text-[#4e4e4e]">Password</Form.Label>
              <div className="relative">
                <Form.Control
                  required
                  className={
                    errors.password || !isPasswordValid ? "!border-red-500" : ""
                  }
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password..."
                  {...register("password")}
                />
                <Button
                  className={`absolute top-[calc(50%-15px)] right-[5px] !h-[30px] !w-[30px] !border-none bg-transparent hover:!bg-[#b8b8b8] ${
                    showPassword
                      ? "bg-[url('@/assets/images/hide.png')] bg-center bg-no-repeat"
                      : "bg-[url('@/assets/images/view.png')] bg-center bg-no-repeat"
                  } `}
                  onClick={toggleShow}
                />
              </div>
              {errors.password && (
                <p className="text-danger !text-[12px]">
                  {errors.password.message}
                </p>
              )}
            </Form.Group>
            <Button
              className="mb-2 w-full !border-none !bg-[#6499E9] px-[8px] duration-[.2s] ease-in-out hover:!bg-[#3085C3]"
              type="submit"
            >
              Log In
            </Button>
            <p className="!mb-[40px] text-center text-[12px]">
              Need an account? <Link to={"/signup"}>Sign up</Link> here!
            </p>
          </Form>
          <div>
            <p className="text-secondary text-md !mt-[10px] w-full border-b border-b-[#6c757d] text-center !leading-[.1em]">
              <span className="bg-[#F9F2ED] px-[10px]">Or With</span>
            </p>
            <div className="mt-4 flex justify-between">
              <Button className="me-2 w-[50%] !rounded-[10px] border border-[#b8b8b8] bg-white px-[15px] py-[2px] !text-[18px] !leading-[35px] !font-bold text-black hover:!bg-[#b8b8b8]">
                <img
                  src={IMAGES.google}
                  alt=""
                  draggable="false"
                  className="mb-[3px] inline-block w-[40px] pr-[10px]"
                />
                Google
              </Button>
              <Button className="ms-2 w-[50%] !rounded-[10px] border border-[#b8b8b8] bg-white px-[15px] py-[2px] !text-[18px] !leading-[35px] !font-bold text-black hover:!bg-[#b8b8b8]">
                <img
                  src={IMAGES.fb}
                  alt=""
                  draggable="false"
                  className="mb-[3px] inline-block w-[40px] pr-[10px]"
                />
                Facebook
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Login;
