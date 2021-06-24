import Logo from '../Logo';


const ErrorPage = () => {
    return (
        <>
            <Logo/>
            <div className="text-gray-300 bg-gray-900 w-full top-0 md:h-32 h-28 lg:h-40 z-10 relative md:inset-0 md:relative transform md:translate-x-0">
            </div>       
            <div className="w-full text-center font-semibold text-3xl pt-4 text-gray-500">
                Error 404: Page not found!
            </div>
        </>
    )
};

export default ErrorPage;