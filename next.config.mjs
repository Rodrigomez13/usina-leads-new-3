/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: false, // Desactivar swcMinify para evitar problemas
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  experimental: {
    // Eliminar opciones experimentales no reconocidas
    webpackBuildWorker: true,
  },
  // Configuración para resolver problemas de compatibilidad con React
  webpack: (config) => {
    // Desactivar la minificación
    config.optimization.minimize = false;
    
    // Resolver problemas de alias para React
    config.resolve.alias = {
      ...config.resolve.alias,
    };
    
    return config;
  },
}

export default nextConfig;
