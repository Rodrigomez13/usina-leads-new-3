// app/page.tsx
'use client'

import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()

  return (
    <div
      className="h-screen w-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: 'url("/background.png")' }}
    >
      <button
        onClick={() => router.push('/dashboard')}
        className="px-6 py-3 text-white bg-black/70 hover:bg-black/90 transition rounded-xl text-xl font-semibold shadow-lg"
      >
        Entrar
      </button>
    </div>
  )
}
