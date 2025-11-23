"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"

export default function VerifyPage() {
  const router = useRouter()
  const [verified, setVerified] = useState(false)

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center px-4">
      <div className="text-center max-w-md w-full">
        <div className="mb-6 flex justify-center">
          <Image alt="homicide.lol" width={50} height={50} className="w-auto h-auto" src="/skull-logo-icon-dark-gothic.jpg" />
        </div>

        <h1 className="text-2xl font-bold mb-4">Verify You're Human</h1>
        <p className="text-white/60 mb-8">Complete the verification below to continue</p>

        <div className="bg-white/5 border border-white/10 rounded-lg p-8 mb-6">
          <div className="flex items-center justify-center min-h-[80px]">
            {/* hCaptcha placeholder - Site key: 6942-4cf2-9150-77fc50b0e46a */}
            <div className="text-white/40 text-sm">
              [hCaptcha widget will be integrated here]
              <br />
              <span className="text-xs">Site Key: 6942-4cf2-9150-77fc50b0e46a</span>
            </div>
          </div>
        </div>

        <button
          onClick={() => {
            setVerified(true)
            setTimeout(() => router.push("/"), 1000)
          }}
          className="main-button w-full"
          disabled={verified}
        >
          <span>{verified ? "Verified! Redirecting..." : "Verify"}</span>
        </button>

        <p className="text-white/40 text-xs mt-4">Protected by hCaptcha</p>
      </div>
    </div>
  )
}
