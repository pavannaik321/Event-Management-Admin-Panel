/*
import { useState } from "react";
import "./App.css";
import HomePage from "./components/UI/Admin/HomePage";
import { UserData } from "./Data";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

function App() {
    const [userData, setUserData] = useState({
        labels: UserData.map((data) => data.year),
        datasets: [
            {
                label: "Users Gained",
                data: UserData.map((data) => data.userGain),
                backgroundColor: [
                    "rgba(75,192,192,1)",
                    "#ecf0f1",
                    "#50AF95",
                    "#f3ba2f",
                    "#2a71d0",
                ],
                // borderColor: "black",

                borderWidth: 2,
            },
        ],
    });

    return (
        <>
            <HomePage chartData={userData}></HomePage>
        </>
    );
}
export default App;
*/

// import { RouterProvider, createBrowserRouter } from "react-router-dom";
// import axios from "axios";
// import EditEventPage from "./pages/EditEvent";
// import ErrorPage from "./pages/Error";
// import EventDetailPage, {
//     loader as eventDetailLoader,
//     action as deleteEventAction,
// } from "./pages/EventDetail";
// import EventsPage, { loader as eventsLoader } from "./pages/Events";
// import EventsRootLayout from "./pages/EventsRoot";
// import HomePage from "./pages/Home";
// import NewEventPage from "./pages/NewEvent";
// import RootLayout from "./pages/Root";
// import { action as manipulateEventAction } from "./components/EventForm";
// import SignUp from "./components/AuthPages/SignUp";
// axios.defaults.baseURL="http://localhost:8000"
// axios.defaults.withCredentials =true
// const router = createBrowserRouter([
//     {
//         path: "/",
//         element: <RootLayout />,
//         errorElement: <ErrorPage />,
//         children: [
//             { index: true, element: <SignUp /> },

//             {
//                 path: "events",
//                 element: <EventsRootLayout />,
//                 children: [
//                     {
//                         index: true,
//                         element: <EventsPage />,
//                         loader: eventsLoader,
//                     },
//                     {
//                         path: ":eventId",
//                         id: "event-detail",
//                         loader: eventDetailLoader,
//                         children: [
//                             {
//                                 index: true,
//                                 element: <EventDetailPage />,
//                                 action: deleteEventAction,
//                             },
//                             {
//                                 path: "edit",
//                                 element: <EditEventPage />,
//                                 action: manipulateEventAction,
//                             },
//                         ],
//                     },
//                     {
//                         path: "new",
//                         element: <NewEventPage />,
//                         action: manipulateEventAction,
//                     },
//                 ],
//             },
//         ],
//     },
// ]);

// function App() {
//     return <RouterProvider router={router} />;
// }

// export default App;
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import axios from "axios";
import EditEventPage from "./pages/EditEvent";
import ErrorPage from "./pages/Error";
import EventDetailPage, {
    loader as eventDetailLoader,
    action as deleteEventAction,
} from "./pages/EventDetail";
import EventsPage, { loader as eventsLoader } from "./pages/Events";
import EventsRootLayout from "./pages/EventsRoot";
import HomePage from "./pages/Home";
import NewEventPage from "./pages/NewEvent";
import RootLayout from "./pages/Root";
import { action as manipulateEventAction } from "./components/EventForm";
import SignUp from "./components/AuthPages/SignUp";
import Login from "./components/AuthPages/Login"; // Import your Login component

axios.defaults.baseURL = "http://localhost:8000";
axios.defaults.withCredentials = true;

const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        errorElement: <ErrorPage />,
        children: [
            { index: true, element: <SignUp /> },
            { path: "login", element: <Login /> }, // Add your login route here

            {
                path: "events",
                element: <EventsRootLayout />,
                children: [
                    {
                        index: true,
                        element: <EventsPage />,
                        loader: eventsLoader,
                    },
                    {
                        path: ":eventId",
                        id: "event-detail",
                        loader: eventDetailLoader,
                        children: [
                            {
                                index: true,
                                element: <EventDetailPage />,
                                action: deleteEventAction,
                            },
                            {
                                path: "edit",
                                element: <EditEventPage />,
                                action: manipulateEventAction,
                            },
                        ],
                    },
                    {
                        path: "new",
                        element: <NewEventPage />,
                        action: manipulateEventAction,
                    },
                ],
            },
        ],
    },
]);

function App() {
    return <RouterProvider router={router} />;
}

export default App;
