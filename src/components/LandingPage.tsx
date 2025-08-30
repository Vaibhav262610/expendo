import Image from 'next/image'
import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { ArrowRight, BarChart3, CheckSquare, DollarSign } from 'lucide-react'
import { SignedIn, SignedOut, SignInButton } from '@clerk/nextjs'
import { Button } from './ui/button'
import Dashboard from './Dashboard'
// import { checkUser } from '@/lib/CheckUser'

const LandingPage = async () => {

  // const user  = await checkUser()

  return (
    <>
        <SignedOut>
    <div className='flex h-screen justify-center items-center'>
        <div className="w-[80%] h-screen flex items-center justify-center bg-gradient-to-br from-[#6C5CE8] via-[#7D5CFA] to-[#4A3FD6] relative overflow-hidden rounded-tr-4xl rounded-br-4xl">

  {/* Decorative blurred shapes for uniqueness */}
  <div className="absolute top-10 left-10 w-60 h-60 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
  <div className="absolute bottom-10 right-10 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>

  {/* Image with glow + hover scale */}
  <Image
    src="/13.png"
    alt="logo"
    width={800}
    height={800}
    className="drop-shadow-[0_0_40px_rgba(255,255,255,0.5)] hover:scale-105 transition-transform duration-500"
  />
</div>

        <div className='w-[50%] h-screen flex items-center justify-center '>
            <div className="flex-1 flex items-center justify-center p-8">
            <div className="max-w-md w-full space-y-8">
              <div className="text-center space-y-4">
                <div className="flex gap-5 items-center justify-center mx-auto mb-4">
                  {/* <CheckSquare className="w-8 h-8 text-primary-foreground" /> */}
                  <Image src="/logo.png" alt="logo" width={100} height={100} />
                <h1 className="text-4xl text-[#6C5CE8] font-bold">
                  Expendo
                </h1>
                </div>
                {/* <p className="text-lg text-muted-foreground">
                  The ultimate productivity platform that combines task management with financial tracking.
                </p> */}
              </div>

              <Card className="border-2 border-primary/20">
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">Get Started</CardTitle>
                  <CardDescription>
                    Join thousands of users managing their tasks and finances in one place
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                        <CheckSquare className="w-4 h-4 text-primary" />
                      </div>
                      <span className="text-sm">Smart task management with priorities</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                        <DollarSign className="w-4 h-4 text-primary" />
                      </div>
                      <span className="text-sm">Track payments and expenses</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                        <BarChart3 className="w-4 h-4 text-primary" />
                      </div>
                      <span className="text-sm">Unified dashboard with insights</span>
                    </div>
                  </div>

                  <SignInButton mode="modal">
                    <Button size="lg" className="w-full bg-[#6C5CE8] text-lg py-6 shadow-lg hover:shadow-xl transition-all">
                      Start Your Journey
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </SignInButton>

                  <p className="text-xs text-center text-muted-foreground">Free to start • No credit card required</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
        </div>
      </SignedOut>
      <SignedIn>
        <Dashboard />
      </SignedIn>
    </>
  )
}

export default LandingPage