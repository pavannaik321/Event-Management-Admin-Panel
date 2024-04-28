import { Form, useNavigate, useActionData } from "react-router-dom";
import axios from "axios";
import classes from "./SignUp.module.css";
import { useEffect } from "react";

function SignUp() {
    const data = useActionData();
    const navigate = useNavigate();

    const isSubmitting = data?.errors;

    const submitHandler = async (event) => {
        event.preventDefault();

        const formData = new FormData(event.target);
        const vendorName = formData.get("vendorName");
        const email = formData.get("email");
        const mobile = formData.get("mobile");
        const office = formData.get("vendorOffice");
        const password = formData.get("password");
        const userData = {
            vendorname: vendorName,
            email: email,
            phone: +mobile,
            password: password,
            venderoffice: office,
        };

        try {
            await axios ({
                method:"post",
                url:"/admin/register",
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
                <label htmlFor="vendorName">Vendor Name</label>
                <input id="vendorName" type="text" name="vendorName" required />
            </p>
            <p>
                <label htmlFor="email">Email</label>
                <input id="email" type="email" name="email" required />
            </p>
            <p>
                <label htmlFor="mobile">Mobile</label>
                <input id="mobile" type="tel" name="mobile" required />
            </p>
            <p>
                <label htmlFor="office">Office</label>
                <input id="office" type="text" name="vendorOffice" required />
            </p>
            <p>
                <label htmlFor="password">Password</label>
                <input id="password" type="password" name="password" required />
            </p>
            <div className={classes.actions}>
                <button type="submit" disabled={isSubmitting}>
                    Signup
                </button>
            </div>
        </Form>
    );
}

export default SignUp;
