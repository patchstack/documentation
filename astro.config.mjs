import { defineConfig, passthroughImageService } from 'astro/config';
import starlight from '@astrojs/starlight';

const site_url = process.env.URL;

const site = site_url || 'http://localhost:4321';
// https://astro.build/config
export default defineConfig({
	site: site,
	image: {
		service: passthroughImageService(),
	},
	integrations: [
		starlight({
			title: 'Patchstack Docs',
			favicon: '/images/psfavicon.svg',
			editLink: {
				baseUrl: 'https://github.com/patchstack/documentation/blob/main'
			},
			customCss: [
				'./src/styles/custom.css',
			],
			logo: {
				src: './src/assets/logo.svg',
				replacesTitle: true,
			},
			social: {
				discord: 'https://discord.gg/rkE8yxtNmS',
				'x.com': 'https://twitter.com/patchstackapp',
				linkedin: 'https://www.linkedin.com/company/patchstack'
			},
			components: {
				//ThemeProvider: './src/components/ThemeProvider.astro',
				//ThemeSelect: './src/components/ThemeSelect.astro',
				Head: './src/components/Head.astro',
				SkipLink: './src/components/SkipLink.astro',
			},
			sidebar: [
				{
					label: 'Getting started',
					collapsed: true,
					autogenerate: { directory: 'Getting Started', collapsed: true },
				},
				{
					label: 'Patchstack app',
					collapsed: true,
					autogenerate: { directory: 'Patchstack App', collapsed: true },
				},
				{
					label: 'Patchstack plugin',
					collapsed: true,
					autogenerate: { directory: 'Patchstack Plugin', collapsed: true },
				},
				{
					label: 'Database & API',
					collapsed: true,
					autogenerate: { directory: 'Database API', collapsed: true },
				},
				{
					label: 'FAQ & troubleshooting',
					collapsed: true,
					autogenerate: { directory: 'FAQ Troubleshooting', collapsed: true },
				},
			/*	{
					label: 'Partners',
					collapsed: true,
					autogenerate: { directory: 'Partners', collapsed: true },
				}, */
				{
					label: 'Vulnerability Disclosure Program',
					collapsed: true,
					autogenerate: { directory: 'Vulnerability Disclosure Program', collapsed: true },
				},
			],
		}),

	],
});
