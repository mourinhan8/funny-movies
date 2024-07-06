import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig((props) => {
  const env = loadEnv(props.mode, process.cwd(), "VITE_APP");
  const envWithProcessPrefix = {
    "process.env": `${JSON.stringify(env)}`,
  };

  return {
      plugins: [
          react(),
      ],
      define: envWithProcessPrefix,
     }
  })
