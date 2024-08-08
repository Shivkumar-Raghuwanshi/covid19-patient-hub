'use client'

import { useState } from 'react'
import Link from 'next/link'
import { SignInButton, SignOutButton, useUser } from '@clerk/nextjs'
import { Button } from '@/components/ui/button'
import { UserCircle, LogOut, LogIn, Menu, X, Home, LayoutDashboard } from 'lucide-react'
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet'

export default function Navbar() {
  const { isSignedIn, user } = useUser()

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-5 md:py-6">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center">
            <div className="h-8 sm:h-10 md:h-12 w-8 sm:w-10 md:w-12 mr-3 bg-white rounded-full flex items-center justify-center">
              <svg className="h-5 sm:h-6 md:h-7 w-5 sm:w-6 md:w-7 text-blue-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M17 21V19C17 16.7909 15.2091 15 13 15H5C2.79086 15 1 16.7909 1 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path fillRule="evenodd" clipRule="evenodd" d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M23 21V19C22.9986 17.1771 21.7011 15.5857 19.91 15.1375" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M20 7.13C21.7699 7.58317 23.0078 9.17879 23 11C23 12.8638 21.7252 14.4299 20 14.87" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <span className="text-xl sm:text-2xl md:text-3xl font-semibold tracking-wide">Covid19 Patient Hub</span>
          </Link>
          <div className="hidden md:flex items-center space-x-4">
            {isSignedIn && (
              <Link href="/dashboard" className="hover:text-blue-200 transition-colors duration-300">
                Dashboard
              </Link>
            )}
            {isSignedIn ? (
              <>
                <div className="flex items-center">
                  <UserCircle className="h-6 w-6 mr-2 text-blue-200" />
                  <span className="font-medium text-blue-100">
                    Welcome, {user.firstName}!
                  </span>
                </div>
                <SignOutButton>
                  <Button variant="outline" className="text-black border-white hover:bg-blue-700 hover:text-white transition-colors duration-300">
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </Button>
                </SignOutButton>
              </>
            ) : (
              <SignInButton mode="modal">
                <Button variant="outline" className="text-black border-white hover:bg-blue-700 hover:text-white transition-colors duration-300">
                  <LogIn className="h-4 w-4 mr-2" />
                  Sign In
                </Button>
              </SignInButton>
            )}
          </div>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden text-white hover:bg-blue-700">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] sm:w-[350px] bg-white">
              <div className="flex flex-col h-full">
                <div className="flex flex-col space-y-4">
                  <Link href="/" className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors duration-300">
                    <Home className="h-5 w-5" />
                    <span>Home</span>
                  </Link>
                  {isSignedIn && (
                    <Link href="/dashboard" className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors duration-300">
                      <LayoutDashboard className="h-5 w-5" />
                      <span>Dashboard</span>
                    </Link>
                  )}
                </div>
                <div className="mt-auto">
                  {isSignedIn ? (
                    <>
                      <div className="flex items-center mb-4 p-4 bg-gray-100 rounded-lg">
                        <UserCircle className="h-10 w-10 text-blue-600 mr-3" />
                        <div>
                          <p className="font-medium text-gray-900">Welcome,</p>
                          <p className="text-blue-600">{user.firstName}!</p>
                        </div>
                      </div>
                      <SignOutButton>
                        <Button variant="outline" className="w-full bg-red-500 text-white hover:bg-red-600 transition-colors duration-300">
                          <LogOut className="h-4 w-4 mr-2" />
                          Sign Out
                        </Button>
                      </SignOutButton>
                    </>
                  ) : (
                    <SignInButton mode="modal">
                      <Button variant="outline" className="w-full bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-300">
                        <LogIn className="h-4 w-4 mr-2" />
                        Sign In
                      </Button>
                    </SignInButton>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  )
}