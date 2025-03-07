import { MouseEvent, useState } from "react";
import Header from "@/components/Common/Header";
import { Button, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Footer from "@/components/Common/Footer";
import { useSignup } from "@/services/useSignup";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import IMAGES from "@/assets/images/images";

const EMAIL_FORMAT = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const PASSWORD_FORMAT =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%^*?#&])[A-Za-z\d@$!%^*?#&]{8,}$/;

const schema = z
  .object({
    name: z.string().min(1, "Please enter a valid name"),
    username: z.string().min(1, "Please enter a valid username"),
    email: z
      .string()
      .min(1, "Please enter a valid email address")
      .regex(EMAIL_FORMAT, "Please enter a valid email address"),
    password: z
      .string()
      .regex(PASSWORD_FORMAT, "Please enter a valid password"),
    passwordConfirm: z.string(),
  })
  .refine((schema) => schema.password === schema.passwordConfirm, {
    message: "Passwords don't match",
    path: ["passwordConfirm"],
  });

export type SignupForm = z.infer<typeof schema>;

function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showCPassword, setShowCPassword] = useState(false);
  const toggleShow = (e: MouseEvent<HTMLButtonElement>) => {
    const { id } = e.currentTarget;
    if (id === "password") {
      setShowPassword((prev) => !prev);
    } else {
      setShowCPassword((prev) => !prev);
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
    onError: (error) => {
      console.log(error);
    },
  });
  const registerAccount = (user: SignupForm) => {
    signup(user);
  };
  return (
    <>
      <Header />
      <div className="h-fit bg-[#F9F2ED] py-[100px]">
        <div className="col-lg-4 col-md-5 mx-auto px-[40px] py-[10px] text-center">
          <h2 className="py-[10px] !text-[36px] !font-bold">Sign Up</h2>
          <hr className="mb-4" />
          <Form className="text-start" onSubmit={handleSubmit(registerAccount)}>
            <Form.Group className="mb-3">
              <Form.Label className="text-[#4e4e4e]">Name</Form.Label>
              <Form.Control
                required
                className={errors.name ? "!border-red-500" : ""}
                type="text"
                placeholder="Jack"
                autoComplete="off"
                {...register("name")}
              />
              {errors.name && (
                <p className="text-danger !text-[12px]">
                  {errors.name.message}
                </p>
              )}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="text-[#4e4e4e]">Username</Form.Label>
              <Form.Control
                required
                className={errors.username ? "!border-red-500" : ""}
                type="text"
                placeholder="dlwl33"
                autoComplete="off"
                {...register("username")}
              />
              {errors.username && (
                <p className="text-danger !text-[12px]">
                  {errors.username.message}
                </p>
              )}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="text-[#4e4e4e]">Email</Form.Label>
              <Form.Control
                required
                className={errors.email ? "!border-red-500" : ""}
                type="email"
                placeholder="asd123@gmail.com"
                autoComplete="off"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-danger !text-[12px]">
                  {errors.email.message}
                </p>
              )}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="text-[#4e4e4e]">Password</Form.Label>
              <div className="relative">
                <Form.Control
                  required
                  className={errors.password ? "!border-red-500" : ""}
                  placeholder="Password"
                  type={showPassword ? "text" : "password"}
                  {...register("password")}
                />
                <Button
                  id="password"
                  className={`absolute top-[calc(50%-15px)] right-[5px] !h-[30px] !w-[30px] !border-none bg-transparent hover:!bg-[#b8b8b8] ${
                    showPassword
                      ? "bg-[url('@/assets/images/hide.png')] bg-center bg-no-repeat"
                      : "bg-[url('@/assets/images/view.png')] bg-center bg-no-repeat"
                  } `}
                  onClick={(e) => toggleShow(e)}
                />
              </div>
              <Form.Text className="text-secondary">
                Password must contain 1 capital letter, 1 special character and,
                longer than 8 words
              </Form.Text>
              {errors.password && (
                <p className="text-danger !text-[12px]">
                  {errors.password.message}
                </p>
              )}
            </Form.Group>
            <Form.Group className="mb-5">
              <Form.Label className="text-[#4e4e4e]">
                Confirm Password
              </Form.Label>
              <div className="relative">
                <Form.Control
                  required
                  placeholder="Confirm Password"
                  className={errors.passwordConfirm ? "!border-red-500" : ""}
                  type={showCPassword ? "text" : "password"}
                  {...register("passwordConfirm")}
                />
                <Button
                  id="confirmPassword"
                  className={`absolute top-[calc(50%-15px)] right-[5px] !h-[30px] !w-[30px] !border-none bg-transparent hover:!bg-[#b8b8b8] ${
                    showCPassword
                      ? "bg-[url('@/assets/images/hide.png')] bg-center bg-no-repeat"
                      : "bg-[url('@/assets/images/view.png')] bg-center bg-no-repeat"
                  } `}
                  onClick={(e) => toggleShow(e)}
                />
              </div>
              {errors.passwordConfirm && (
                <p className="text-danger !text-[12px]">
                  {errors.passwordConfirm.message}
                </p>
              )}
            </Form.Group>
            <Button
              className="mb-2 w-full !border-none !bg-[#6499E9] px-[8px] duration-[.2s] ease-in-out hover:!bg-[#3085C3]"
              type="submit"
            >
              Sign up
            </Button>
            <p className="!mb-[40px] text-center !text-[12px]">
              Already signed up? <Link to={"/login"}>Log in</Link> here!
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

export default Signup;
