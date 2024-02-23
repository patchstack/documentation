import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

const site_url = process.env.URL;

const site = site_url || 'http://localhost:4321';
// https://astro.build/config
export default defineConfig({
	site,
	integrations: [
		starlight({
			title: 'Patchstack Docs',
			favicon: '/images/psfavicon.svg',
			customCss: [
				'./src/styles/custom.css',
			],
			logo: {
				src: './src/assets/logo.svg',
				replacesTitle: true,
			},
			social: {
				github: 'https://github.com/patchstack/documentation',
				discord: 'https://discord.gg/rkE8yxtNmS',
				twitter: 'https://twitter.com/patchstackapp',
				linkedin: 'https://www.linkedin.com/company/patchtsack'
			},
			components: {
				ThemeProvider: './src/components/ThemeProvider.astro',
				ThemeSelect: './src/components/ThemeSelect.astro',
				Head: './src/components/Head.astro'
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
