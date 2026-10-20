import adapter from '@sveltejs/adapter-vercel';
import { defineConfig } from 'vitest/config';
import { sveltekit } from '@sveltejs/kit/vite';

export default defineConfig({
	plugins: [
		sveltekit({
			inspector: {
				toggleKeyCombo: 'control-shift-x',
				showToggleButton: 'active',
				toggleButtonPos: 'bottom-right'
			},

			// adapter-auto only supports some environments, see https://svelte.dev/docs/kit/adapter-auto for a list.
			// If your environment is not supported, or you settled on a specific environment, switch out the adapter.
			// See https://svelte.dev/docs/kit/adapters for more information about adapters.
			adapter: adapter()
		})
	],
	server: { host: true, allowedHosts: ['mapkitlabs.test'] },
	test: { include: ['src/**/*.{test,spec}.{js,ts}'] }
});
