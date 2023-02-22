import React, {useEffect} from "react";
import {useLocation, useParams} from "react-router-dom";
import UserService from "../../services/UserService";

const Home = () => {

    useEffect(() => {
        UserService.verify().then((res) => {
            console.log(res);

    }).catch((err) => {
            console.log(err);
        }
    )
    },[])


    return <div>Home</div>;
};

export default Home;
