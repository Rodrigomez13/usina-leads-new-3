/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Configuración para resolver problemas de compatibilidad con React 18/19
  webpack: (config) => {
    // Evitar errores de minificación
    config.optimization.minimize = false;
    
    return config;
  },
}

export default nextConfig;