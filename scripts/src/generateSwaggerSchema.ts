#!/usr/bin/env ts-node-script
import { exec } from "child_process"
import { config } from "dotenv"

config({ path: ".env.local" })

const url = process.env.VITE_SWAGGER_SCHEMA_URL || "https://acc.api.wonen.zaken.amsterdam.nl/api/v1/schema/"

console.log(`👉 Generating schema from \`${ url }\``)

exec(`dtsgen -o ./src/__generated__/apiSchema.d.ts --url ${ url }`,
  (error, stdout, stderr) => {
    if (error) {
      console.log("ERROR")
      console.log(error.message)
      process.exit(1)
      return
    }

    if (stderr) {
      console.log("ERROR")
      console.log(stderr)
      process.exit(1)
      return
    }

    console.log(stdout)
  }
)
