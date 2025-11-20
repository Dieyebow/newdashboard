import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogIn } from 'lucide-react';
import { useAuthStore } from '../store/authStore';

export default function Login() {
  const [token, setToken] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { setToken: storeToken } = useAuthStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!token.trim()) {
      setError('Veuillez entrer un token valide');
      return;
    }

    // Store the token
    storeToken(token);

    // Redirect to dashboard
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-600 to-purple-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <LogIn className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">PeeloCar Dashboard</h1>
          <p className="text-gray-600 mt-2">Connectez-vous pour continuer</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="token" className="block text-sm font-medium text-gray-700 mb-2">
              Token JWT
            </label>
            <textarea
              id="token"
              value={token}
              onChange={(e) => {
                setToken(e.target.value);
                setError('');
              }}
              placeholder="Collez votre token JWT ici..."
              rows={6}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none font-mono text-sm"
            />
            {error && (
              <p className="mt-2 text-sm text-red-600">{error}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
          >
            <LogIn className="w-5 h-5 mr-2" />
            Se connecter
          </button>
        </form>

        {/* Info */}
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-800">
            💡 Utilisez le token JWT fourni dans la documentation de l'API pour vous connecter.
          </p>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-gray-600">
          <p>PeeloCar Dashboard v1.0</p>
          <p className="mt-1">Système de gestion d'auto-école</p>
        </div>
      </div>
    </div>
  );
}
