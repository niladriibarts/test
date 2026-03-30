import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios"

function Login() {
    
    const [value, setValue] = useState({
        email:"",
        password:""
    });

    const handleChange = (e)=>{
        const {name, value} = e.target
        setValue((prv) =>({
                ...prv, 
                [name] : value 
            })
        )
    }
    const handleSubmit = async(e)=>{
        e.preventDefault();
        try{
            console.log(value);
            const res = await axios.post(
                "https://ideal-orbit-4j9qp57x6g57hjwwx-8080.app.github.dev/",
                value
                );
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
                        className="isLogin active"
                    >
                        LOGIN
                    </span>
                    </Link>
                    <Link to="/register">
                        <span
                            className="isRegister"
                        >
                            REGISTER
                        </span>
                    </Link>
                </div>

                {/* Form */}
                <form className="form" onSubmit={handleSubmit}>

                    <input type="email" placeholder="Email" name="email" value={value.email} onChange={handleChange} />
                    <input type="password" placeholder="Password" name="password" value={value.password} onChange={handleChange} />

                    <button type="submit">
                        SIGN IN
                    </button>
                </form>
            </div>
        </div>
    );
}
export default Login