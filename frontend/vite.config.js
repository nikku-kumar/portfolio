import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({command,mode})=>({
  base:command==='build'||mode==='production'?'/portfolio/':'/',
  plugins:[react()],
  server:{port:5173},
  test:{environment:'jsdom',setupFiles:'./src/testSetup.js'},
}));
