import { OGImageRoute } from 'astro-og-canvas';
import { getCollection } from 'astro:content';

const collectionEntries = await getCollection('docs');
collectionEntries.push({ id: 'index', data: { title: 'Patchstack Documentation' } });

const pages = Object.fromEntries(collectionEntries.map(({ id, data }) => [id, data]));

export const { getStaticPaths, GET } = await OGImageRoute({
    param: 'route',
    pages: pages,
    getImageOptions: (path, page) => ({
        title: page.ogtitle ? page.ogtitle : page.title,
        description: 'Detect & patch vulnerabilities in your WordPress apps',
        bgImage: {
            path: './public/images/og_bg.png',
            fit: 'contain'
        },
        logo: {
            path: './public/images/patchstack_logomark.png',
            size:[100]
        },
        font: {
            title: {
                size: 65,
                families: [
                    'Faktum',
                ],
                weight: 'SemiBold',
            },
            description: {
                size: 25,
                lineHeight: 1.25,
                families: [
                    'Faktum',
                ],
                weight: 'regular',
            },
        },
        fonts: [
            './src/pages/open-graph/_faktum.woff',
        ],
    }),
});