import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
const path = require('path');

export default defineConfig({
    plugins: [
        Vue(),
    ],
    test: {
        globals: true,
        environment: 'jsdom',
        css: true,
        setupFiles: './src/vitest/setup.js',
    },
    resolve: {
        alias: {
            components: path.resolve(__dirname, 'src/components/'),
            enums: path.resolve(__dirname, 'src/enums/'),
            maps: path.resolve(__dirname, 'src/maps/'),
        },
    },
});
