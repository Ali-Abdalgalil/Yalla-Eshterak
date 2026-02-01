import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { routes } from './routes'
import { useAuth } from './context/AuthContext'

function App() {
  return (
    <Routes>
      {routes.map(({ path, element, protected: isProtected, adminOnly }) => (
        <Route
          key={path}
          path={path}
          element={
            isProtected ? (
              adminOnly ? (
                <AdminRoute>{element}</AdminRoute>
              ) : (
                <ProtectedRoute>{element}</ProtectedRoute>
              )
            ) : (
              element
            )
          }
        />
      ))}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

/* 🔐 Login required */
function ProtectedRoute({ children }) {
  const location = useLocation()
  const token = localStorage.getItem('auth_token')

  if (!token) {
    return <Navigate to="/login" replace state={{ from: location }} />
  }

  return children
}

/* 🛡️ Admin only */
function AdminRoute({ children }) {
  const location = useLocation()
  const { user } = useAuth()
  const token = localStorage.getItem('auth_token')

  if (!token) {
    return <Navigate to="/login" replace state={{ from: location }} />
  }

  if (user?.role !== 'admin') {
    return <Navigate to="/" replace />
  }

  return children
}

export default App