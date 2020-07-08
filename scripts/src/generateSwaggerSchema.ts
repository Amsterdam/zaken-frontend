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

exec(`dtsgen -o ./src/__generated__/apiSchema.d.ts -n API --url ${ url }`,
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
