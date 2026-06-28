import { defineConfig } from 'vitest/config';
import { sveltekit } from '@sveltejs/kit/vite';

export default defineConfig({
	plugins: [sveltekit()],
	server: {
		host: true,
		allowedHosts: ['mapkitlabs.test']
	},

	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
});
