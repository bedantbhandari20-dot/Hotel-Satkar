import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext.jsx'

export default function AdminLogin() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await login(email, password)
      navigate('/admin')
    } catch (err) {
      setError('Invalid email or password.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#2C2418] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Brand */}
        <div className="text-center mb-8">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[rgba(210,185,140,0.45)] mb-2">Admin Panel</p>
          <h1 className="font-display text-4xl text-[#F5F0E8] uppercase tracking-wider">Satkar</h1>
          <p className="mt-2 text-[rgba(210,185,140,0.5)] text-sm">Hotel · Bakery · Café</p>
        </div>

        {/* Card */}
        <form onSubmit={handleSubmit} className="bg-[#FAF7F0] rounded-lg p-8 space-y-5">
          {error && (
            <p className="text-red-600 text-sm bg-red-50 border border-red-200 rounded px-3 py-2">{error}</p>
          )}

          <div>
            <label className="block text-[11px] font-mono uppercase tracking-widest text-[#6B5E4F] mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2.5 bg-[#EDE7DA] border border-[rgba(44,36,24,0.12)] rounded text-[#2C2418] text-sm focus:outline-none focus:ring-2 focus:ring-[#C4982C]/40"
              placeholder="admin@satkar.com"
            />
          </div>

          <div>
            <label className="block text-[11px] font-mono uppercase tracking-widest text-[#6B5E4F] mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2.5 bg-[#EDE7DA] border border-[rgba(44,36,24,0.12)] rounded text-[#2C2418] text-sm focus:outline-none focus:ring-2 focus:ring-[#C4982C]/40"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-[#2C2418] text-[#F5F0E8] rounded text-sm font-mono uppercase tracking-widest hover:bg-[#3d3324] transition-colors disabled:opacity-50"
          >
            {loading ? 'Signing in…' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  )
}
