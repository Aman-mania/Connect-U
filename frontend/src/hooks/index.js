import { BACKEND_URL } from "../config";
import axios from "axios";
import { useEffect,useState } from "react";

export const workerList = () => {
    const [loading, setloading] = useState(true);
    const [list, setlist] = useState([]);

    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/worker/list`,{
            headers:{
                Authorization:localStorage.getItem("token")
            }
        }).then(responce => {
            setlist(responce.data.list);
            setloading(false);
        })
    })

    return {
        loading,
        list
    }
}


export const clientList = () => {
    const [loading, setloading] = useState(true);
    const [list, setlist] = useState([]);

    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/client/list`,{
            headers:{
                Authorization:localStorage.getItem("token")
            }
        }).then(responce => {
            setlist(responce.data.list);
            setloading(false);
        })
    })

    return {
        loading,
        list
    }
}


export const clientNotification = () => {
    const [loading, setloading] = useState(true);
    const [notification, setnotification] = useState([]);

    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/client/notification`,{
            headers:{
                Authorization:localStorage.getItem("token")
            }
        }).then(responce => {
            setnotification(responce.data.msg);
            setloading(false);
        })
    })

    return {
        loading,
        notification
    }
}


export const workerNotification = () => {
    const [loading, setloading] = useState(true);
    const [notification, setnotification] = useState([]);

    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/worker/notification`,{
            headers:{
                Authorization:localStorage.getItem("token")
            }
        }).then(responce => {
            setnotification(responce.data.msg);
            setloading(false);
        })
    })

    return {
        loading,
        notification
    }
}


export const workerFeedback = () => {
    const [loading, setloading] = useState(true);
    const [feedback, setfeedback] = useState([]);

    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/worker/feedback`,{
            headers:{
                Authorization:localStorage.getItem("token")
            }
        }).then(responce => {
            setfeedback(responce.data.msg);
            setloading(false);
        })
    })

    return {
        loading,
        feedback
    }
}