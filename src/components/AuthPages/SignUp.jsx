import {
    Form,
    useNavigate,
    useActionData,
    json,
    redirect,
} from "react-router-dom";
import axios from "axios";
import classes from "./SignUp.module.css"; // Update class name
import { useEffect } from "react";

function SignUp() {
    const data = useActionData();
    const navigate = useNavigate();

    const isSubmitting = data?.errors; // Check for errors in data

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
        // Handle form submission logic here (e.g., call API to create user)

        const response = await axios({
            method: "post",
            url: "http://localhost:8000/admin/register",
            data: userData,
            header: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });

        if (!response.ok) {
            throw json({ message: "Could not signup." }, { status: 500 });
        }
        console.log("success");
        navigate("/events");

        // For demonstration purposes, redirect after a simulated delay
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

// Update action function if needed for signup logic
export async function action({ request, params }) {
    const method = request.method;
    const data = await request.formData();

    const userData = {
        vendorname: data.get("vendorName"),
        email: data.get("email"),
        phone: +data.get("mobile"),
        password: data.get("password"),
        venderoffice: data.get("vendorOffice"),
    };
    console.log(userData);
    let url = "http://localhost:8000/admin/register";

    // if (method === "PATCH") {
    //     const eventId = params.eventId;
    //     url = "http://localhost:8080/events/" + eventId;
    // }

    const response = await fetch(url, {
        method: method,
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
    });

    if (response.status === 422) {
        return response;
    }

    if (!response.ok) {
        throw json({ message: "Could not signup." }, { status: 500 });
    }

    return redirect("/events");
}
