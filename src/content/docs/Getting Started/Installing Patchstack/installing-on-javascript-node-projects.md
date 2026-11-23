---
title: "Installing on JavaScript / Node.js projects"
excerpt: "Connect a JavaScript or Node.js app to Patchstack with the official @patchstack/connect package — by pasting one prompt into your AI assistant, or with one command."
hidden: false
createdAt: "Tue Jul 14 2026 00:00:00 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Wed Nov 18 2026 00:00:00 GMT+0000 (Coordinated Universal Time)"
sidebar:
  order: 7.3
  label: "JavaScript / Node.js projects"
---

Patchstack protects JavaScript and Node.js apps through [`@patchstack/connect`](https://www.npmjs.com/package/@patchstack/connect), the official package published by Patchstack on npm. It is separate from the WordPress plugin.

There are two ways to install it:

- **[With an AI assistant](#install-with-an-ai-assistant)** — paste one prompt into your AI site builder or coding assistant. Use this for apps built in Lovable, Replit, Bolt and similar tools.
- **[By hand](#install-by-hand)** — run one command in the project folder.

Both run the same `setup` command and end with a link to your site's dashboard.

## Install with an AI assistant

1. In the Patchstack App, go to **Sites**, click **Add site**, and select **AI-built** from the platform list.
2. Tick **Connect this website to my account automatically** if you want the site to appear in your account without a further step.
3. Copy the message the app shows and paste it into your assistant's chat.
4. Wait for the assistant to finish. It shows the summary `setup` printed, including your dashboard link.
5. Publish or deploy your app when you are ready. The assistant does not deploy for you, and your live site is covered only after you publish the build that contains these changes.

### The prompt

This is the message the app gives you, with the claim token replaced by a placeholder:

```text
I have reviewed the official @patchstack/connect package (https://www.npmjs.com/package/@patchstack/connect), Patchstack's security package for JavaScript and Node.js apps (separate from its WordPress plugin), and authorize its Patchstack Connector, production build hooks, runtime protection source edits, structural attack-surface map uploads (not source code), live-rule retrieval, and reports to Patchstack of the requests its rules match or block. Add it as a regular dependency with this project's package manager, then run its CLI with `PATCHSTACK_ENVIRONMENT=sandbox npx @patchstack/connect setup --widget --claim-token <token>` for this hosted workspace, leave dev builds unchanged, verify protection, restart the preview server if needed to load the new guard, and show the dashboard URL. The claim token in that command connects this app to my Patchstack account. The Patchstack Connector widget is part of this install and on by default: add it, and do not ask me whether to. Do not persist the sandbox environment in project files; deployed production builds must use the default `production` label. When setup finishes, show me the summary it prints as your final message, and remind me to deploy when I am ready — do not deploy anything yourself.
```

:::caution[Copy the message from the app, not from this page]
The app fills in a claim token for your account, and a token stops working after a day. Treat a message that carries your token like a sign-in link: anyone who runs it connects their project to your account.
:::

Paste the message whole. Its wording is the one tested against AI assistants, and a missing sentence is usually a question the assistant stops to ask.

<details>
<summary>What each part of the prompt does</summary>

| Part of the prompt | Why it is there |
|---|---|
| "I have reviewed … and authorize …" | Tells the assistant you chose this package and lists what you agree to. Without it, assistants often decline to install a package that edits the project and reports to an outside service. |
| "separate from its WordPress plugin" | Stops the assistant from looking for the WordPress plugin in a JavaScript project. |
| "Add it as a regular dependency with this project's package manager" | Asks for an ordinary install with npm, pnpm, yarn or bun, to match the project's lockfile. |
| `PATCHSTACK_ENVIRONMENT=sandbox` | Labels the builder's workspace as a sandbox for this one command. A later sentence keeps the label out of the project files, so the build you publish reports as `production`. |
| `--widget` | Asks `setup` to add [the Patchstack Connector](#the-patchstack-connector). The sentence about the widget tells the assistant not to stop and ask about it. |
| `--claim-token <token>` | Creates the site already attached to your account. The app adds it only when you tick **Connect this website to my account automatically**. |
| "verify protection, restart the preview server if needed" | Asks the assistant to check the result, not only install the package. |
| "do not deploy anything yourself" | Leaves publishing to you. |

</details>

If the assistant refuses to run the install or the `setup` command, see [My AI assistant blocked a Connect command](/getting-started/installing-patchstack/ai-assistant-blocked-a-command/).

## Install by hand

Run this in the project folder:

```bash
npx @patchstack/connect setup --widget
```

No signup or site ID is needed first. `setup` adds the package with the project's own package manager, creates the site in Patchstack and prints a dashboard link.

- **To connect the site to your account in the same step,** add `--claim-token <token>` with the token from the app's AI-built message.
- **In a hosted builder's workspace** (Lovable, Replit and similar), put `PATCHSTACK_ENVIRONMENT=sandbox` in front of the command, as the prompt above does. On your own machine, leave it out.
- **If you install the package yourself first,** use the package manager that owns the lockfile, and add it to `dependencies`, not `devDependencies`. The runtime guard is loaded by your running app, so a deployment that removes development dependencies would lose it.

## What `setup` changes

`setup` makes a fixed set of changes, and running it again is safe:

1. **Adds `@patchstack/connect`** to the project's dependencies if it is missing.
2. **Reports your dependencies.** It reads the lockfile (`package-lock.json`, `pnpm-lock.yaml`, `yarn.lock` or a bun lockfile) and sends package names and versions to Patchstack.
3. **Creates the site** on the first run and writes its ID to `.patchstackrc.json`. Commit this file. Later runs reuse the same site.
4. **Adds the Patchstack Connector** to your root page or layout, when run with `--widget`.
5. **Installs the runtime guard** in your server code and checks that it is wired in. See [Runtime protection](#runtime-protection).
6. **Uploads an attack-surface map** and fetches the protection rules for your app.
7. **Adds scans to `package.json`:** one after each install, and one before and after each production build. Your existing build command is kept and dev scripts are not touched.
8. **Prints a summary** of what worked, what still needs a manual step, and your dashboard link.

`setup` never starts your app, runs a build, or deploys.

It also saves a credential in `.patchstackrc.local.json` and adds that file to `.gitignore`. Do not commit it. For the published site, add the credential to your host as the `PATCHSTACK_API_KEY` secret; `npx @patchstack/connect go-live` shows the steps for your host.

To see what is set up and what is missing at any time, run `npx @patchstack/connect guide`. To print the dashboard link again, run `npx @patchstack/connect status`.

## Connecting the site to your account

A site that is not connected to an account is still monitored, but its reports have nowhere to go. Because the site ID is public and connecting is first-come, anyone who loads the page could connect it. Connect it soon after installing.

If you used a claim token, the site is already in your account and there is nothing more to do. An expired or unrecognised token does not break the install: the site is created unconnected and `setup` prints the dashboard link.

Otherwise, use any one of these:

1. **The widget on your site (shortest).** While the site is unconnected, the widget on your preview shows a one-time **Connect this website** panel. Sign in there.
2. **The dashboard link.** Open the link that `setup` or `status` printed, and sign in.
3. **The terminal.** Run `npx @patchstack/connect claim`, open the link it prints, and sign in.

On a published site the panel is hidden from visitors. As the owner you can still open it by adding `#patchstack` (or `?patchstack`) to any page URL.

## The Patchstack Connector

The Patchstack Connector is a small floating widget that Connect adds to your site. It is one script tag that loads `https://cdn.patchstack.com/patchstack-widget.js` with your site ID. The site ID is public by design and is not a secret.

What the widget shows depends on the site:

- **Not connected yet:** a one-time **Connect this website** panel, for you to sign in.
- **Connected:** a **Report a vulnerability** button, so anyone who spots an issue can report it to you.
- **Published site:** the connect panel and the owner **Log in** link are hidden from visitors.

**Signing in.** The sign-in form leads with **Continue with Patchstack**, which signs you in with the account you are already using at app.patchstack.com. It works for SSO and two-factor accounts. E-mail, Google, GitHub and LinkedIn sign-in are underneath.

**Frameworks without an HTML page.** Connect adds the tag to `index.html`, `public/index.html` or `src/app.html`, or to a JSX root or Astro layout. For other frameworks, such as Nuxt, `npx @patchstack/connect guide` prints the exact snippet and the file to put it in. The [widget reference](https://cdn.patchstack.com/llm.html) covers more patterns.

**Turning it off.** Run `npx @patchstack/connect widget --remove`, or set `"widget": false` in `.patchstackrc.json`. Removing the tag by hand is not enough, because the next scan adds it back.

If the widget does not appear, see [Troubleshooting JS / Node.js](/getting-started/installing-patchstack/troubleshooting-javascript-node-projects/).

## Runtime protection

`setup` installs a runtime guard: code that runs inside your server and blocks requests that try to exploit known vulnerabilities in your dependencies, until you can upgrade them. The guard fetches its rules from Patchstack and reports the requests those rules match or block.

- **Supported server setups are wired automatically,** including TanStack Start with Supabase, the shape Lovable produces. Other layouts get a starting file and a list of manual checks in the `setup` summary.
- **A site with no server code has nothing to guard.** A client-only app gets dependency monitoring and the widget, and `setup` says that protection is limited.
- **Restart a running app** after `setup`, so it loads the guard.
- **To check the wiring,** run `npx @patchstack/connect protect --check`. It reads your source and does not run the app.

## Security and data handling

**Sent to Patchstack**

- Package names and versions from the lockfile.
- Your site's public address and name, when the project or your host states them.
- A build fingerprint for each production build.
- The attack-surface map: routes, input names, the packages behind them, and relative file and line locations.
- Reports of the requests that protection rules match or block.

**Never sent:** source code, environment variable values, secrets, or git history.

To see the dependency report before it is sent, run `npx @patchstack/connect scan --dry-run`.

**Written to your project**

- `.patchstackrc.json` — site ID and settings. Commit it.
- `.patchstackrc.local.json` — the credential. Kept out of git.
- The widget tag in your root page or layout.
- The dependency and the scan entries in `package.json`.
- The runtime guard in your server code.

The CLI never opens the dashboard link for you and never asks for your Patchstack password.

## Uninstalling

1. Note the site ID in `.patchstackrc.json`. It identifies the site in the dashboard.
2. Run `npx @patchstack/connect uninstall` to tell Patchstack the package is being removed. This does not change any local files.
3. Remove the widget tag from your page or layout, and the runtime guard that `setup` added to your server code.
4. Remove the `patchstack-connect` entries from the `package.json` scripts, keeping any other commands on the same line.
5. Remove the package with your package manager: `npm uninstall`, `pnpm remove`, `yarn remove` or `bun remove`, followed by `@patchstack/connect`.
6. Delete `.patchstackrc.json`, `.patchstackrc.local.json`, and any `PATCHSTACK_*` variables on your host.

Reporting stops at once. An unconnected site's record is deleted. A site connected to your account stays there until you delete it at https://app.patchstack.com.

## Troubleshooting

- **The widget is missing, the published site serves an old build, or the package is stuck on an old version:** see [Troubleshooting JavaScript / Node.js projects](/getting-started/installing-patchstack/troubleshooting-javascript-node-projects/), which has prompts to paste into your AI site builder.
- **The assistant would not run `npm install` or `setup`:** see [My AI assistant blocked a Connect command](/getting-started/installing-patchstack/ai-assistant-blocked-a-command/).

## More

- **Source (MIT-licensed):** https://github.com/patchstack/connect
- **Full reference:** the [package README](https://github.com/patchstack/connect#readme)
- **Hosting partners** can enable npm vulnerability intelligence for the sites they host through the [Threat Intelligence API npm features](/api-solutions/threat-intelligence-api/npm-features/). That is applied by the host. `@patchstack/connect` is the self-service path, and works whether or not your host is a Patchstack partner.
