// import axios from "axios";

// const API_AUTH = "http://34.159.48.221/auth";

// const api = axios.get(API_AUTH)
//         .then(response => {
//             console.log(response);
//         })
//         .catch(error => {
//             console.error(error);
//         })

const reg = async function register(API_AUTH){
    const response = await fetch(API_AUTH, {
        headers:{
            'content-type': 'application/json', 

        },
    });
    const responseData = await response.json();
    console.log(responseData);
}

export default reg;
