#!/usr/bin/env ts-node-script
import { exec } from "child_process"
import { config } from "dotenv-flow"
import { slashSandwich } from "./utils/url.utils"

// Loads .env.development or .env.production based on NODE_ENV
config()

const url = slashSandwich([
  process.env.REACT_APP_GATEWAY_HOST,
  process.env.REACT_APP_GATEWAY_PATH,
  process.env.REACT_APP_GATEWAY_SCHEMA
], { leadingSlash: false })

exec(`dtsgen -o ./src/__generated__/apiSchema.d.ts --config ./scripts/src/config/dtsgen.json --url ${ url }`,
  (error, stdout, stderr) => {
    if (error) {
      console.log("ERROR")
      console.log(error.message)
      return
    }

    if (stderr) {
      console.log("ERROR")
      console.log(stderr)
      return
    }

    console.log(stdout)
  }
)
