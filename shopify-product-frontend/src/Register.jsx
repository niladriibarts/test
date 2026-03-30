import { useState } from "react";
import { Link } from "react-router-dom";

function Register() {
    const [ value, setValue ] = useState({
        name:"",
        email:"",
        password:""
    });
    const handleChange = (e)=>{

    }
    const handleSubmit = (e)=>{

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
                    
                    <input type="text" placeholder="Full Name" name="name" value={value.name} onChange={handleChange} />
                    <input type="email" placeholder="Email" name="email" value={value.email} onChange={handleChange} />
                    <input type="password" placeholder="Password" name="password" value={value.password} onChange={handleChange} />

                    <button type="submit">
                        SIGN UP
                    </button>
                </form>
            </div>
        </div>
    );
}
export default Register