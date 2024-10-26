import { useLocation, useNavigate } from "react-router-dom";
import Button from "../../shared/Button";
import useAuth from "../../hooks/useAuth";
import useAxios from "../../hooks/useAxios";

const SignUp = () => {

    const { signInWithGoogle } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const axiosPublic = useAxios();


    const from = location.state?.from?.pathname || '/';

    const handleSocialLogin = () => {
        signInWithGoogle()
            .then(result => {
                const currentDate = new Date().toISOString();
                const userInfo = {
                    email: result?.user?.email,
                    name: result?.user?.displayName,
                    photo: result?.user?.photoURL,
                    date: currentDate,
                    role: 'user'
                };
                axiosPublic.put('/users', userInfo)
                    .then(res => {
                        console.log(res.data, "User log in successfully");
                        navigate(from, { replace: true });
                    })
                console.log(userInfo);
            })

            .catch(error => {
                console.log(error);
            });
    };

    return (
        <div className="text-white py-10 text-center font-semibold min-h-screen">
            <h2 className="text-3xl md:text-4xl mb-3">Sign Up with Google</h2>
            <p className="font-light">
                Create your account quickly and securely using your Google account. <br />
                Sign up to explore and submit top websites by category.
            </p>

            <div className="mt-6">
                <Button onClick={handleSocialLogin} text={"Sign Up with Google"} />
            </div>
        </div>
    );
};

export default SignUp;

