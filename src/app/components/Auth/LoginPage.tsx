import { Link } from "react-router-dom"
import Button from "../ui/Button"
import StyledInput from "../ui/StyledInput"
import { useState } from "react";
import Loader from "../../animations/Loading";
import { useAuth } from "./hook/useAuth";


const LoginPage = () => {
    const [formData, setFormData] = useState(
        { email: '', password: '' }
    );
    const { loading, login } = useAuth();
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const input = [
        {
            id: "email",
            type: "email",
            placeholder: "Enter your email",
            name: "email",
            value: formData.email,
        },
        {
            id: "password",
            type: "password",
            placeholder: "Enter your password",
            name: "password",
            value: formData.password
        }]


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await login({ email: formData.email, password: formData.password });
        setFormData({ email: '', password: '' });
    };

    return (
        <div className="flex min-h-screen items-center justify-center ">
            <div className="w-full max-w-lg bg-white py-10 px-10 rounded-xl shadow-2xl">
                <h2 className="flex flex-col items-center gap-2 mt-2 mb-8">
                    <span className="text-4xl font-bold text-primary">Let's Get You</span>
                    <span className="text-2xl font-semibold ">Signed In</span>
                </h2>


                <form className="space-y-6" onSubmit={handleSubmit}>
                    {input.map((inputField) => (
                        <div key={inputField.id} className="w-full">
                            <label htmlFor={inputField.id} className="block text-sm font-medium text-gray-700">{inputField.id.charAt(0).toUpperCase() + inputField.id.slice(1)}:</label>
                            <StyledInput
                                type={inputField.type}
                                placeholder={inputField.placeholder}
                                name={inputField.name}
                                value={inputField.value}
                                onChange={handleChange}
                                id={inputField.id}
                            />
                        </div>
                    ))}
                    <div className="flex flex-col w-full  justify-center">
                        <Button className="mt-2 py-[22px]  text-slate-900" type="submit">
                            {loading ? <div className="flex items-center justify-center">
                                <Loader />Submitting...
                            </div> : 'Login'}
                        </Button>
                        <span className="text-sm text-blue-800 mt-2 ml-1 font-normal hover:underline cursor-pointer">Forgot password?</span>
                    </div>
                    <div className="text-center">
                        <p className="text-sm ">
                            <span className="mr-1">Don't have an account?</span>
                            <Link to="/register" className="text-blue-600 hover:underline">
                                Register
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default LoginPage