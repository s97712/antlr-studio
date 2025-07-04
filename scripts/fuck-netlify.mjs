import getPort from "get-port"
import { spawnSync } from "child_process"

const args = process.argv.slice(2);
if (args.every(arg => !arg.startsWith("--port"))) {
  args.push(`--port=${process.env["PORT"]}`)
}

spawnSync(`netlify dev --staticServerPort=${await getPort()} ${args.join(" ")}`, {
  env: {
    ...process.env,
  },
  stdio: "inherit",
  shell: true
})
