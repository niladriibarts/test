import { useEffect,useState } from "react";
import { Link } from "react-router-dom";

function CreateProduct(){
    const [show, setShow] =useState(true);
   
    useEffect(()=>{
            const token = localStorage.getItem('tokenKey');
            if(!token){
                setShow(false);
            }
        },
        []
    );

    return(
        <>
            {show ? (
                <h1>Create Product</h1>
            ) : (
                <Link to="/">
                    <h1>Please login first</h1>
                </Link>
            )}
        </>
    );
}
export default CreateProduct