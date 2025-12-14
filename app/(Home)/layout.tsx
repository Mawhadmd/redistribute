import React from 'react'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
          <header className="App-header">
          <Navbar />
        </header>
    
          {children}
 
    <Footer />
    </>
  )
}
