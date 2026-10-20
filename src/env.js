import { defineEnvVars } from '@sveltejs/kit/env';

export const variables = defineEnvVars({ PUBLIC_MAP_TOKEN: { public: true, static: true } });
