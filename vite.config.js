import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { visualizer } from "rollup-plugin-visualizer";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    visualizer({
      open: true, // Auto-open the report in your browser
      filename: "bundle-stats.html", // Output file name
      gzipSize: true, // Show gzip-compressed sizes
      brotliSize: true, // Show brotli-compressed sizes
    })
  ],
  // base: "/movie-directory/", // deploy the file with subfolder path
//   server: {
//     proxy: {
//         "/youtube-api": {
//             target: "https://www.youtube.com",
//             changeOrigin: true,
//             rewrite: (path) => {
//                 console.log("Proxying API:", path);
//                 return path.replace(/^\/youtube-api/, "");
//             },
//             secure: true,
//         },
//         // "/youtube-embed": {
//         //     target: "https://www.youtube.com",
//         //     changeOrigin: true,
//         //     rewrite: (path) => {
//         //         console.log("Proxying Embed:", path);
//         //         return path.replace(/^\/youtube-embed/, "/embed");
//         //     },
//         //     secure: true,
//         // },
//     },
// },
})
