import React, { useState } from 'react';
import { supabase } from '../supabaseClient';

interface SignInModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SignInModal: React.FC<SignInModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleEmailSignIn = async (e: React.FormEvent) => {

    e.preventDefault();
    setError('');

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setError(error.message);
    const user = data.user;
    if (user) {
      // Check if profile exists
      const { data: existingProfile } = await supabase
        .from('profiles')
        .select('id')
        .eq('id', user.id)
        .single();
  
      if (!existingProfile) {
        // Insert new profile
        await supabase.from('profiles').insert({
          id: user.id,
          email: user.email
        });
      }
  
      alert('Signed in successfully');
    
      onClose();
    }
  };

  const handleGoogleSignIn = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({ provider: 'google' });
    
    if (error) setError(error.message);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center px-4">
      <div className="bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Sign In</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800 dark:hover:text-white text-xl leading-none">&times;</button>
        </div>

        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

        <form onSubmit={handleEmailSignIn} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300">Email</label>
            <input
              type="email"
              className="w-full mt-1 px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-900 text-sm text-gray-900 dark:text-gray-100"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="relative">
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300">Password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              className="w-full mt-1 px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-900 text-sm text-gray-900 dark:text-gray-100"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-8 right-3 text-xs text-gray-500 dark:text-gray-400 cursor-pointer"
            >
              {showPassword ? 'Hide' : 'Show'}
            </span>
          </div>

          <button
            type="submit"
            className="w-full bg-black dark:bg-white text-white dark:text-black text-xs py-2 rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
          >
            Sign In
          </button>
        </form>

        <div className="my-4 text-center text-xs text-gray-600 dark:text-gray-400">or</div>

        <button
          onClick={handleGoogleSignIn}
          className="w-full border border-gray-300 dark:border-gray-600 text-xs py-2 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
        >
          Continue with Google
        </button>
      </div>
    </div>
  );
};

export default SignInModal;
