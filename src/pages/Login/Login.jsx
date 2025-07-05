import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


import Logo from 'components/Logo';
import loginIllustration from 'assets/login-bg.png';


export default function Login() {
    const [step, setStep] = useState(1); // 1 = email, 2 = otp
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSendOtp = () => {
        if (!email || !email.includes('@')) {
            setError('Please enter a valid email address.');
            return;
        }
        // Simulate OTP send
        console.log('Sending OTP to:', email);
        setStep(2);
        setError('');
    };

    const handleVerifyOtp = () => {
        if (otp.trim().toLowerCase() === 'abc123') {
            console.log('✅ Login successful');
            // Implement actual login success handling
            localStorage.setItem('auth', 'true');
            navigate('/dashboard');

        } else {
            setError('Invalid OTP. Please try again.');
        }
    };

    return (
        <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
            {/* Left: Login Form */}
            <div className="flex flex-col justify-center items-center px-8 py-12 bg-white dark:bg-dark-bg">
                <div className="w-full max-w-sm">
                    <div className="flex justify-center mb-6">
                        <Logo />
                    </div>
                    <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-white">
                        Welcome back
                    </h2>

                    <form className="space-y-4" onSubmit={e => e.preventDefault()}>
                        {step === 1 && (
                            <>
                                <div>
                                    <label className="block text-sm text-gray-700 dark:text-gray-200">Email</label>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                        className="mt-1 w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-primary"
                                    />
                                </div>

                                {error && <p className="text-red-500 text-sm">{error}</p>}

                                <button
                                    onClick={handleSendOtp}
                                    className="w-full bg-primary text-white py-2 rounded-md hover:bg-primary/90 transition"
                                >
                                    Send OTP
                                </button>
                            </>
                        )}

                        {step === 2 && (
                            <>
                                {/* Email display + Change option */}
                                <div className="flex justify-between items-center mb-4">
                                    <div className="text-sm text-gray-700 dark:text-gray-300">
                                        OTP sent to: <span className="font-medium">{email}</span>
                                    </div>
                                    <button
                                        type="button"
                                        className="text-sm text-primary hover:underline"
                                        onClick={() => {
                                            setStep(1);
                                            setOtp('');
                                        }}
                                    >
                                        Change Email
                                    </button>
                                </div>

                                {/* OTP Boxes */}
                                <label className="block text-sm text-gray-700 dark:text-gray-200 mb-2">Enter OTP</label>
                                <div className="flex justify-between gap-2">
                                    {Array.from({ length: 6 }).map((_, idx) => (
                                        <input
                                            key={idx}
                                            type="text"
                                            inputMode="numeric"
                                            maxLength={1}
                                            className="w-12 h-12 text-center border border-gray-300 dark:border-gray-700 rounded-md text-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                                            value={otp[idx] || ''}
                                            onChange={(e) => {
                                                const val = e.target.value.replace(/[^0-9a-zA-Z]/g, '').toUpperCase();
                                                if (!val) return;
                                                const otpArr = otp.split('');
                                                otpArr[idx] = val[0];
                                                setOtp(otpArr.join(''));
                                                // Move to next box
                                                if (e.target.nextSibling) e.target.nextSibling.focus();
                                            }}
                                            onKeyDown={(e) => {
                                                if (e.key === 'Backspace' && !otp[idx] && e.target.previousSibling) {
                                                    const otpArr = otp.split('');
                                                    otpArr[idx - 1] = '';
                                                    setOtp(otpArr.join(''));
                                                    e.target.previousSibling.focus();
                                                }
                                            }}
                                        />
                                    ))}
                                </div>

                                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

                                <button
                                    onClick={handleVerifyOtp}
                                    className="w-full bg-primary text-white py-2 rounded-md hover:bg-primary/90 transition mt-6"
                                >
                                    Verify OTP
                                </button>
                            </>
                        )}
                    </form>

                    <div className="mt-6 text-center">
                        <button
                            type="button"
                            className="w-full flex items-center justify-center gap-2 border border-gray-300 dark:border-gray-600 rounded-md py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                        >
                            <img
                                src="https://www.svgrepo.com/show/475656/google-color.svg"
                                alt="Google"
                                className="h-5 w-5"
                            />
                            Continue with Google
                        </button>
                    </div>

                    <p className="mt-6 text-sm text-center text-gray-600 dark:text-gray-400">
                        Don’t have an account? <a href="#" className="text-primary hover:underline">Sign up</a>
                    </p>
                </div>
            </div>

            {/* Right: Illustration or Background */}
            <div
                className="hidden md:block bg-cover bg-center"
                style={{ backgroundImage: `url(${loginIllustration})` }}
            ></div>
        </div>
    );
}