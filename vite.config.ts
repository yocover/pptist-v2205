import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'

export default defineConfig({
  define: {
    global: 'globalThis',
  },
  plugins: [
    vue() as any,
    AutoImport({
      imports: ['vue', 'vue-router', 'pinia'],
      dts: true
    }) as any,
    Components({
      resolvers: [
        AntDesignVueResolver({
          importStyle: 'less'
        })
      ],
      dts: true
    }) as any
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @import '@/assets/styles/variable.scss';
          @import '@/assets/styles/mixin.scss';
        `
      },
      less: {
        modifyVars: {
          'primary-color': '#d14424',
          'text-color': '#41464b',
          'font-size-base': '13px',
          'border-radius-base': '2px',
        },
        javascriptEnabled: true,
      }
    }
  },
  base: './',
  build: {
    outDir: 'dist',
    assetsDir: 'assets'
  },
  server: {
    port: 8080,
    open: true
  }
})
