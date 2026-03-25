import React from 'react'
import Navbar from './components/Navbar'
import { Outlet } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import AuthProvider from './context/AuthProvider'

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <div className="App">
          <Navbar />
          <main>
            <Outlet />
          </main>
        </div>
      </CartProvider>
    </AuthProvider>
  )
}

export default App
