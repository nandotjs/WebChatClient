import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Meu App',
  description: 'Descrição do meu app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  )
}
