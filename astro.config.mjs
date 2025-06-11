import { defineConfig, passthroughImageService } from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightLlmsTxt from 'starlight-llms-txt'


const site_url = process.env.URL;

const site = site_url || 'http://localhost:4321';
// https://astro.build/config
export default defineConfig({
	site: site,
	image: {
		service: passthroughImageService(),
	},
	banner: {
		enabled: false,
		content: 'Black Friday Deal - <a href="https://patchstack.com/black-friday-2024/" target="about:blank">50% off dev plan for 6 months</a>',
	
	},
	integrations: [
		starlight({
			plugins: [
				starlightLlmsTxt()
				// Generate the OpenAPI documentation pages.
				// starlightOpenAPI([
				// 	{
				// 		base: 'developer-api',
				// 		label: 'My API',
				// 		schema: './schemas/test.yaml',
				// 	},
				// ])
			],
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
			social: [
				{ icon: 'discord', label: 'discord', href: 'https://discord.gg/rkE8yxtNmS' },
				{ icon: 'x.com', label: 'x.com', href: 'https://twitter.com/patchstackapp' },
				{ icon: 'linkedin', label: 'linkedin', href: 'https://www.linkedin.com/company/patchstack' }
			],
			components: {
				//ThemeProvider: './src/components/ThemeProvider.astro',
				//ThemeSelect: './src/components/ThemeSelect.astro',
				Head: './src/components/Head.astro',
				SkipLink: './src/components/SkipLink.astro',
				PageFrame: './src/components/PageFrame.astro',
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
					label: 'API solutions',
					collapsed: true,
					autogenerate: { directory: 'API solutions', collapsed: true },
				},
				{
					label: 'Vulnerability Disclosure Program',
					collapsed: true,
					autogenerate: { directory: 'Vulnerability Disclosure Program', collapsed: true },
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

			],
		}),

	],

});
