import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			title: 'Patchstack Docs',
			customCss: [
				'./src/styles/custom.css',
			],
			logo: {
				src: './src/assets/logo.svg',
				replacesTitle: true,
			},
			social: {
				github: 'https://github.com/withastro/starlight',
			},
			components: {
				ThemeProvider: './src/components/ThemeProvider.astro',
				ThemeSelect: './src/components/ThemeProvider.astro'
			},
			sidebar: [
				{
					label: 'Getting started',
					collapsed: true,
					autogenerate: { directory: 'getting-started', collapsed: true },
				},
				{
					label: 'Patchstack App',
					collapsed: true,
					autogenerate: { directory: 'patchstack-app', collapsed: true },
				},
				{
					label: 'Patchstack Plugin',
					collapsed: true,
					autogenerate: { directory: 'patchstack-plugin', collapsed: true },
				},
				{
					label: 'Vulnerability Database',
					collapsed: true,
					autogenerate: { directory: 'vulnerability-database', collapsed: true },
				},
				{
					label: 'FAQ & Troubleshooting',
					collapsed: true,
					autogenerate: { directory: 'faq-troubleshooting', collapsed: true },
				},
			],
		}),
	],
});
