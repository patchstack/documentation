<center>
<img src="./public/images/patchstack_logomark.png" style="width:150px;">
</center>

# Patchstack Documentation

## What is Patchstack
Patchstack is a powerful tool that helps to protect your WordPress applications from attacks and identify security vulnerabilities within all your WordPress plugins, themes, and core. It is powered by the WordPress ecosystem's most active community of ethical hackers. Patchstack is trusted by leading WordPress experts such as Pagely, Cloudways, GridPane, Plesk, and others.

[**Check our website**](https://patchstack.com/)
[**Join our Community**](https://discord.com/servers/patchstack-alliance-1024691600619745334)

## Installation
**Prerequisites**
**Node.js** - v18.14.1 or higher.

1. Fork the repository first.
2. `git clone` the forked repository on your computer.
3. Run `npm install` and `npm start`

## Project structure
**Patchstack Documentation** is built on top of [**Astro**🚀](https://astro.build/) and [**Astro Starlight**✨](https://starlight.astro.build/).
```
.
├── public/
├── src/
│   ├── assets/
│   ├── content/
│   │   ├── docs/
│   │   └── config.ts
|   ├── libs
|   ├── pages
|   ├── styles
│   └── env.d.ts
├── astro.config.mjs
├── package.json
└── tsconfig.json
```

The part that should interest you the most is the `src/content/docs` folder. All the website content is there in Markdown or MDX format.

## Commands
All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |
