import {
    Form,
    useNavigate,
    useActionData,
    json,
    redirect,
} from "react-router-dom";
import axios from "axios";
import classes from "./SignUp.module.css"; // Update class name

function Login() {
        const data = useActionData();
        const navigate = useNavigate();
    
        const isSubmitting = data?.errors;
    
        const submitHandler = async (event) => {
            event.preventDefault();
    
            const formData = new FormData(event.target); 
            const email = formData.get("email"); 
            const password = formData.get("password");
            const userData = {
    
                email: email,
                password: password,
            };
    
            try {
                await axios ({
                    method:"post",
                    url:"/admin/login",
                    data:userData,
                    header:{
                        "Content-Type":"application/json"}
                }).then((res)=>{
                    console.log(res)
                }).catch((err)=>{
                    console.log(err)
                })
                console.log("success")
                navigate("/events");
            } catch (error) {
                console.error("Error occurred while signing up:", error.message);
            }
        };
    
    return (
        <Form method="post" onSubmit={submitHandler} className={classes.form}>
            {data && data.errors && (
                <ul className={classes.errors}>
                    {Object.values(data.errors).map((err) => (
                        <li key={err}>{err}</li>
                    ))}
                </ul>
            )}
            <p>
                <label htmlFor="email">Email</label>
                <input id="email" type="email" name="email" required />
            </p>
            <p>
                <label htmlFor="password">Password</label>
                <input id="password" type="password" name="password" required />
            </p>
            <div className={classes.actions}>
                <button type="submit" disabled={isSubmitting}>
                    Login
                </button>
            </div>
        </Form>
    );
}

export default Login;

 