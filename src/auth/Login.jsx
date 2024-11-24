import React, { useState } from 'react';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('demo@cargoconnect.com');
    const [password, setPassword] = useState('demo123');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        
        try {
            const result = await login(email, password);
            if (result.success) {
                navigate('/');
            } else {
                setError(result.error || 'Login failed');
            }
        } catch (err) {
            setError('An error occurred during login');
            console.error('Login error:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#EAEDED] py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div className="text-center">
                    <img
                        src="/cargo-logo.svg"
                        alt="Cargo Connect Logo"
                        className="mx-auto h-16 w-auto"
                    />
                    <h2 className="mt-6 text-3xl font-extrabold text-[#232F3E]">
                        Welcome to Cargo Connect
                    </h2>
                    <p className="mt-2 text-sm text-gray-600">
                        Your complete export management solution
                    </p>
                </div>

                {/* Demo credentials notice */}
                <div className="rounded-md bg-[#232F3E]/5 p-4">
                    <div className="text-sm text-[#232F3E]">
                        <strong>Demo Credentials:</strong><br />
                        Email: demo@cargoconnect.com<br />
                        Password: demo123
                    </div>
                </div>

                <form 
                    className="mt-8 space-y-6" 
                    onSubmit={handleSubmit}
                    autoComplete="off"
                >
                    {error && (
                        <div className="rounded-md bg-red-50 p-4">
                            <div className="text-sm text-red-700">{error}</div>
                        </div>
                    )}
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="email-address" className="sr-only">
                                Email address
                            </label>
                            <input
                                id="email-address"
                                name="email"
                                type="email"
                                autoComplete="off"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-[#FF9900] focus:border-[#FF9900] focus:z-10 sm:text-sm"
                                placeholder="Email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="off"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-[#FF9900] focus:border-[#FF9900] focus:z-10 sm:text-sm"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={loading}
                            className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${
                                loading 
                                    ? 'bg-[#232F3E]/70 cursor-not-allowed' 
                                    : 'bg-[#232F3E] hover:bg-[#232F3E]/90'
                            } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF9900]`}
                        >
                            {loading ? 'Signing in...' : 'Sign in'}
                        </button>
                    </div>
                </form>
                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-600">
                        Need help?{' '}
                        <a href="mailto:support@cargoconnect.com" className="text-[#FF9900] hover:text-[#FF9900]/80">
                            Contact Support
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;