import React from "react";
import Card from "../Card";
import Sales from "./Sales";
const HomePage = ({ chartData }) => {
    return (
        <Card>
            <Sales chartData={chartData}></Sales>
        </Card>
    );
};

export default HomePage;
