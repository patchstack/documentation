---
title: "Error: my AI assistant blocked the @patchstack/connect install"
excerpt: "Claude Code or another coding assistant refused to run npm install or npx @patchstack/connect setup"
hidden: false
createdAt: "Wed Sep 30 2026 00:00:00 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Wed Sep 30 2026 00:00:00 GMT+0000 (Coordinated Universal Time)"
---
Some coding assistants, Claude Code among them, stop commands that download or run a package from npm. That can block `npm install --save-dev @patchstack/connect` or `npx @patchstack/connect setup` part-way through connecting a JavaScript or Node.js project.

Running the blocked command yourself is fine. In Claude Code, type it in the prompt with `!` in front — for example `! npx @patchstack/connect setup` — so it runs in your session and Claude can see the output and finish the install.

See [My AI assistant blocked a Connect command](/getting-started/installing-patchstack/ai-assistant-blocked-a-command/) for the full steps, including other assistants and a permission rule that lets Claude Code run the Connect commands itself.
