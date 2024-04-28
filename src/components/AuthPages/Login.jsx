import {
    Form,
    useNavigate,
    useActionData,
    json,
    redirect,
} from "react-router-dom";

import classes from "./SignUp.module.css"; // Update class name

function SignUp() {
    const data = useActionData();
    const navigate = useNavigate();

    const isSubmitting = data?.errors; // Check for errors in data

    // function submitHandler(event) {
    //     event.preventDefault();

    //     const formData = new FormData(event.target);
    //     const vendorName = formData.get("vendorName");
    //     const email = formData.get("email");
    //     const mobile = formData.get("mobile");
    //     const office = formData.get("office");
    //     const password = formData.get("password");

    //     // Handle form submission logic here (e.g., call API to create user)

    //     // For demonstration purposes, redirect after a simulated delay
    //     setTimeout(() => {
    //         navigate("/success"); // Redirect to success page after signup
    //     }, 1000); // Simulate processing time (replace with actual logic)
    // }

    return (
        <Form method="post" className={classes.form}>
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

export default SignUp;

// Update action function if needed for signup logic
export async function action({ request, params }) {
    const method = request.method;
    const data = await request.formData();

    const userData = {
        email: data.get("email"),
        password: data.get("password"),
    };
    console.log(userData);
    let url = "http://localhost:8000";

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
