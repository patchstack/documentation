import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { defineConfig, passthroughImageService } from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightLlmsTxt from 'starlight-llms-txt'
import starlightOpenAPI, { openAPISidebarGroups } from 'starlight-openapi'
import Converter from 'openapi-to-postmanv2'


const site_url = process.env.URL;

const site = site_url || 'http://localhost:4321';

const postmanCollections = [
	{
		openapi: './public/schemas/threat-intel-beta.yaml',
		output:  './public/schemas/threat-intel-beta.postman_collection.json',
	},
];

function postmanFromOpenAPI() {
	return {
		name: 'postman-from-openapi',
		hooks: {
			'astro:config:setup': async ({ logger }) => {
				for (const { openapi, output } of postmanCollections) {
					const spec = await readFile(fileURLToPath(new URL(openapi, import.meta.url)), 'utf8');
					await new Promise((resolve, reject) => {
						Converter.convert(
							{ type: 'string', data: spec },
							{ requestParametersResolution: 'Example' },
							async (err, result) => {
								if (err || !result.result) {
									return reject(err ?? new Error(result.reason ?? 'Postman conversion failed'));
								}
								await writeFile(
									fileURLToPath(new URL(output, import.meta.url)),
									JSON.stringify(result.output[0].data, null, 2),
								);
								logger.info(`generated ${output}`);
								resolve();
							},
						);
					});
				}
			},
		},
	};
}
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
		postmanFromOpenAPI(),
		starlight({
			plugins: [
				starlightLlmsTxt(),
				starlightOpenAPI([
					{
						base: 'api-reference/threat-intelligence-beta',
						label: 'Interactive reference (Beta)',
						schema: './public/schemas/threat-intel-beta.yaml',
					},
				]),
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
					items: [
						{ slug: 'api-solutions' },
						{
							label: 'App API',
							collapsed: true,
							autogenerate: { directory: 'API solutions/App API', collapsed: true },
						},
						{
							label: 'Threat Intelligence API',
							collapsed: true,
							items: [
								{ slug: 'api-solutions/threat-intelligence-api/beta' },
								...openAPISidebarGroups,
								{ slug: 'api-solutions/threat-intelligence-api/overview' },
								{ slug: 'api-solutions/threat-intelligence-api/standard' },
								{ slug: 'api-solutions/threat-intelligence-api/extended' },
								{ slug: 'api-solutions/threat-intelligence-api/api-properties' },
							],
						},
					],
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
