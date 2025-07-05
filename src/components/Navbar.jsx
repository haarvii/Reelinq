import Logo from './Logo';
import { User, Moon, Sun } from 'lucide-react';
import { Link } from 'react-router-dom';
import useDarkMode from 'hooks/useDarkMode';


export default function Navbar() {

    // const [isDark, setIsDark] = useDarkMode();

    return (
        <nav className="flex justify-between items-center px-6 py-4 bg-white dark:bg-dark-bg shadow">
            <div className="flex items-center">
                <Logo />
            </div>

            <div className="hidden sm:flex items-center space-x-6 text-sm font-medium text-gray-800 dark:text-gray-100">
                <a href="#home" className="hover:text-primary transition">Home</a>
                <a href="#features" className="hover:text-primary transition">Features</a>
                <a href="#pricing" className="hover:text-primary transition">Pricing</a>
                <a href="#faq" className="hover:text-primary transition">FAQ</a>
            </div>

            <div className="flex items-center space-x-4">
                <Link to="/login">
                    <button
                        className="p-2 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                        title="Login / Profile"
                    >
                        <User className="w-6 h-6 font-bold text-gray-700 dark:text-gray-100 hover:scale-110 transition-transform duration-200" />
                    </button>
                </Link>

                {/* Theme Toggle */}
                {/* <button
                    onClick={() => setIsDark(!isDark)}
                    className="p-2 border rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                >
                    {isDark ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-gray-600 dark:text-white" />}
                </button> */}

            </div>
        </nav>
    );
}