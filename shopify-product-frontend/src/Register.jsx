import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Register() {
    const [ value, setValue ] = useState({
        name:"",
        email:"",
        password:""
    });
    const handleChange = (e)=>{
        // setValue({...value,[e.target.name]:e.target.value});
        
        setValue(
            (pre)=>{
                return({
                    ...pre,
                    [e.target.name]:e.target.value
                })
            }
        );
    }
    const handleSubmit = async(e)=>{
        e.preventDefault();
        try{

            const res = await axios.post('https://ideal-orbit-4j9qp57x6g57hjwwx-8080.app.github.dev/register', value)
            
            console.log(res.data);

            setValue({
                name:"",
                email:"",
                password:""
            })

        }catch(err){
            console.log(err);
        }
    }

    return (
        <div className="auth-container">
            <div className="auth-box">

                {/* Tabs */}
                <div className="tabs">
                    <Link to="/">
                        <span
                            className="isLogin"
                        >
                            LOGIN
                        </span>
                    </Link>
                    <Link to="/register">
                        <span
                            className="isRegister active"
                        >
                            REGISTER
                        </span>
                    </Link>
                </div>

                {/* Form */}
                <form className="form" onSubmit={handleSubmit} >
                    
                    <input type="text" placeholder="Full Name" name="name" value={value.name} onChange={handleChange} required />
                    <input type="email" placeholder="Email" name="email" value={value.email} onChange={handleChange} required />
                    <input type="password" placeholder="Password" name="password" value={value.password} onChange={handleChange} required />

                    <button type="submit">
                        SIGN UP
                    </button>
                </form>
            </div>
        </div>
    );
}
export default Register