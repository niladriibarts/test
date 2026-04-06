import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function CreateProduct() {
    const [loading, setLoading] = useState(true);
    const [isAuth, setIsAuth] = useState(false);

    useEffect(() => {
        const checkAuth = () => {
            axios.post("https://ideal-orbit-4j9qp57x6g57hjwwx-8080.app.github.dev/createproduct",
            {},
            {
                withCredentials: true
            })
            .then((res) => {
                setIsAuth(true);
                setLoading(false);
            })
            .catch((err) => {
                setIsAuth(false);
                setLoading(false);
            });
        }

        checkAuth();
        
        const interval = setInterval(checkAuth, 5000); // every 5 sec
        return () => clearInterval(interval);

    }, []);

    if (loading) return <h2>Loading...</h2>;

    return (
        <>
            {isAuth ? (
                <h1>Create Product</h1>
            ) : (
                <Link to="/">
                    <h1>Please login first</h1>
                </Link>
            )}
        </>
    );
}

export default CreateProduct;









// import { useEffect,useState } from "react";
// import { Link } from "react-router-dom";

// function CreateProduct(){
//     const [show, setShow] =useState(true);
   
//     useEffect(()=>{
//             const token = localStorage.getItem('tokenKey');
//             if(!token){
//                 setShow(false);
//             }
//         },
//         []
//     );

//     return(
//         <>
//             {show ? (
//                 <h1>Create Product</h1>
//             ) : (
//                 <Link to="/">
//                     <h1>Please login first</h1>
//                 </Link>
//             )}
//         </>
//     );
// }
// export default CreateProduct