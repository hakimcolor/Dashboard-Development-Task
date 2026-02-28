import { useContext, useState, useEffect, useRef } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { updateProfile } from 'firebase/auth';
import { AuthContext } from '../Context/AuthContext';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';

const SignUp = () => {
  const navigate = useNavigate();
  const { createUser } = useContext(AuthContext);
  const vantaRef = useRef(null);
  const [vantaEffect, setVantaEffect] = useState(null);

  const [email, setEmail] = useState('');
  const [passcode, setPasscode] = useState('');
  const [firstName, setFirstName] = useState('');
  const [profileFile, setProfileFile] = useState(null);
  const [show, setShow] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (!vantaEffect && window.VANTA) {
      setVantaEffect(
        window.VANTA.WAVES({
          el: vantaRef.current,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.0,
          minWidth: 200.0,
          scale: 1.0,
          scaleMobile: 1.0,
          color: 0x1a237e,
          shininess: 30.0,
          waveHeight: 15.0,
          waveSpeed: 0.75,
          zoom: 0.75,
        })
      );
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);

  const handleToggle = () => setShow(!show);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    const terms = e.target.terms.checked;
    const firstNameValue = firstName.trim();
    const emailValue = email.trim();
    const passwordValue = passcode.trim();

    if (!terms) {
      setError('Please accept our terms and conditions.');
      toast.error('Please accept our terms and conditions.');
      return;
    }

    if (!profileFile) {
      setError('Please select a profile image.');
      toast.error('Please select a profile image.');
      return;
    }

    if (passwordValue.length < 6) {
      setError('Password must be at least 6 characters long.');
      toast.error('Password must be at least 6 characters long.');
      return;
    }
    if (!/[A-Z]/.test(passwordValue)) {
      setError('Password must contain at least one uppercase letter.');
      toast.error('Password must contain at least one uppercase letter.');
      return;
    }
    if (!/[0-9]/.test(passwordValue)) {
      setError('Password must include at least one number.');
      toast.error('Password must include at least one number.');
      return;
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(passwordValue)) {
      setError(
        'Password must include at least one special character (e.g., # or % ).'
      );
      toast.error(
        'Password must include at least one special character (e.g., # or % ).'
      );
      return;
    }

    try {
      setUploading(true);
      toast.loading('Uploading image...');

      const formData = new FormData();
      formData.append('image', profileFile);
      const uploadRes = await axios.post(
        `https://api.imgbb.com/1/upload?key=4069702c25ccc162b662f2c5ce170f8d`,
        formData
      );

      const imgUrlValue = uploadRes.data.data.url;
      toast.dismiss();
      toast.success('Image uploaded successfully!');

      // Create Firebase user
      const res = await createUser(
        emailValue,
        passwordValue,
        firstNameValue,
        imgUrlValue
      );

      await updateProfile(res.user, {
        displayName: firstNameValue,
        photoURL: imgUrlValue,
      });

      // Note: The backend API is read-only, so user data is stored in Firebase only
      console.log('User data:', {
        name: firstNameValue,
        email: emailValue,
        img: imgUrlValue,
      });

      e.target.reset();
      setEmail('');
      setPasscode('');
      setFirstName('');
      setProfileFile(null);
      setSuccess(true);
      setUploading(false);
      toast.success('Registration successful!');
      navigate('/');
    } catch (err) {
      setUploading(false);
      toast.dismiss();
      setError(err.message);
      toast.error(err.message);
    }
  };

  return (
    <div
      ref={vantaRef}
      className="min-h-screen flex items-center justify-center px-4 relative pt-20 pb-10 overflow-hidden"
    >
      <Toaster position="top-right" reverseOrder={false} />

      <div className="bg-white/95 backdrop-blur-sm shadow-2xl rounded-3xl p-10 w-full max-w-md relative z-10">
        <h2 className="text-4xl font-extrabold text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-8 animate-fade-in">
          Join Us Today! 🚀
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col">
            <label className="text-gray-700 mb-2 font-medium">First Name</label>
            <input
              type="text"
              name="firstName"
              placeholder="Enter your first name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              className="w-full px-4 py-3 bg-gradient-to-r from-blue-50 to-indigo-50 text-gray-800 border-2 border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all duration-300"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-700 mb-2 font-medium">
              Profile Image
            </label>
            <input
              type="file"
              name="profileImage"
              accept="image/*"
              onChange={(e) => setProfileFile(e.target.files[0])}
              required
              className="w-full px-4 py-3 bg-gradient-to-r from-blue-50 to-indigo-50 text-gray-800 border-2 border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all duration-300 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-gradient-to-r file:from-blue-500 file:to-indigo-500 file:text-white file:cursor-pointer hover:file:from-blue-600 hover:file:to-indigo-600"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-700 mb-2 font-medium">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 bg-gradient-to-r from-blue-50 to-indigo-50 text-gray-800 border-2 border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all duration-300"
            />
          </div>

          <div className="relative flex flex-col">
            <label className="text-gray-700 mb-2 font-medium">Password</label>
            <input
              type={show ? 'text' : 'password'}
              name="password"
              placeholder="Enter your password"
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
              required
              className="w-full px-4 py-3 bg-gradient-to-r from-blue-50 to-indigo-50 text-gray-800 border-2 border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none pr-12 transition-all duration-300"
            />
            <button
              type="button"
              onClick={handleToggle}
              className="absolute mt-14 right-4 -translate-y-1/2 text-blue-500 hover:text-blue-700"
            >
              {show ? (
                <AiOutlineEyeInvisible size={22} />
              ) : (
                <AiOutlineEye size={22} />
              )}
            </button>
          </div>

          <div className="flex items-center gap-2 mt-2">
            <input
              type="checkbox"
              name="terms"
              id="terms"
              className="w-4 h-4 accent-blue-600"
            />
            <label htmlFor="terms" className="text-gray-600 text-sm">
              Accept our{' '}
              <span className="text-blue-600 font-semibold">
                terms and conditions
              </span>
            </label>
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}
          {success && (
            <p className="text-green-500 text-sm">Registration successful!</p>
          )}

          <button
            type="submit"
            disabled={uploading}
            className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed transform hover:scale-105"
          >
            {uploading ? 'Uploading...' : 'Sign Up'}
          </button>
        </form>

        <p className="text-sm text-center text-gray-600 mt-6">
          Already have an account?{' '}
          <NavLink to="/" className="text-blue-600 font-bold hover:underline">
            Sign In
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
