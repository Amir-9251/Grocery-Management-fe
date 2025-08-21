interface LoaderProps {
    className?: string;
}

const Loader: React.FC<LoaderProps> = ({ className = "" }) => {
    return (
        <div role="status" className={`flex items-center justify-center ${className}`}>
            <div className="relative">
                <div className="w-8 h-8 border-4 border-gray-200 border-t-orange-500 rounded-full animate-spin"></div>
                <div className="absolute inset-0 w-8 h-8 border-4 border-transparent border-t-orange-300 rounded-full animate-spin animate-reverse opacity-75"></div>
            </div>
            <span className="sr-only">Loading...</span>
        </div>
    )
}

export default Loader
