import {
    Form,
    useNavigate,
    useNavigation,
    useActionData,
    json,
    redirect,
} from "react-router-dom";

import classes from "./EventForm.module.css";

function EventForm({ method, event }) {
    const data = useActionData();
    const navigate = useNavigate();
    const navigation = useNavigation();

    const isSubmitting = navigation.state === "submitting";

    function cancelHandler() {
        navigate("..");
    }

    return (
        <Form method={method} className={classes.form}>
            {data && data.errors && (
                <ul>
                    {Object.values(data.errors).map((err) => (
                        <li key={err}>{err}</li>
                    ))}
                </ul>
            )}
            <p>
                <label htmlFor="title">Venue Title</label>
                <input
                    id="title"
                    type="text"
                    name="title"
                    required
                    defaultValue={event ? event.title : ""}
                />
            </p>
            <p>
                <label htmlFor="location">Location</label>
                <input
                    id="location"
                    type="text"
                    name="location"
                    required
                    defaultValue={event ? event.title : ""}
                />
            </p>
            <p>
                <label htmlFor="image">Image</label>
                <input
                    id="image"
                    type="url"
                    name="image"
                
                    defaultValue={event ? event.image : ""}
                />
            </p>
            <p>
                <label htmlFor="price">Price</label>
                <input
                    id="price"
                    type="number"
                    name="price"
                    required
                    defaultValue={event ? event.price : ""}
                />
            </p>
            <p>
                <label htmlFor="price">Capacity</label>
                <input
                    id="capacity"
                    type="number"
                    name="capacity"
                    required
                    defaultValue={event ? event.capacity : ""}
                />
            </p>
             <p>
                <label htmlFor="description">Description</label>
                <textarea
                    id="description"
                    name="description"
                    rows="5"
                    required
                    defaultValue={event ? event.description : ""}
                />
            </p>
            <div className={classes.actions}>
                <button
                    type="button"
                    onClick={cancelHandler}
                    disabled={isSubmitting}
                >
                    Cancel
                </button>
                <button disabled={isSubmitting}>
                    {isSubmitting ? "Submitting..." : "Save"}
                </button>
            </div>
        </Form>
    );
}

export default EventForm;

export async function action({ request, params }) {
    const method = request.method;
    const data = await request.formData();

    const eventData = {
        venueName: data.get("title"),
        location:data.get("location"),
        capacity: +data.get("capacity"),
        description: data.get("description"),
        price:+data.get("price"),
        image:data.get("image"),
        // image: data.get("description"),

    };

    let url = "http://localhost:8000/admin/addVenue";

    // if (method === "PATCH") {
    //     const eventId = params.eventId;
    //     url = "http://localhost:8080/events/" + eventId;
    // }

    const response = await fetch(url, {
        method: method,
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(eventData),
    });

    if (response.status === 422) {
        return response;
    }

    if (!response.ok) {
        throw json({ message: "Could not save event." }, { status: 500 });
    }

    return redirect("/events");
}
