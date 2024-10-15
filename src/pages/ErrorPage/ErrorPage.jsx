import Button from "../../shared/Button";

const ErrorPage = () => {
    return (
        <div className="text-white flex flex-col justify-center items-center py-10 text-center font-semibold min-h-screen"  style={{ backgroundImage: "url('./light_06 1.png')", backgroundRepeat : "no-repeat"}}>
            <h2 className="text-3xl md:text-4xl mb-3">404 - Page Not Found</h2>

            <p>Sorry, the page you’re looking for doesn’t exist.</p>

            <div className="mt-6">
                <Button to={'/'} text={"Back To Home"} />
            </div>
        </div>
    );
};

export default ErrorPage;