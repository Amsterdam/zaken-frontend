#!/usr/bin/env ts-node-script

const { exec } = require("child_process")

// Loads .env.development or .env.production based on NODE_ENV
require("dotenv-flow").config()

const { slashSandwich } = require("./utils/url.utils")

const url = slashSandwich([
  process.env.REACT_APP_GATEWAY_HOST,
  process.env.REACT_APP_GATEWAY_PATH,
  process.env.REACT_APP_GATEWAY_SCHEMA
], { leadingSlash: false })

exec(`dtsgen -o ./src/__generated__/apiSchema.d.ts -n API --url ${ url }`,
  (error: { message: string }, stdout: string, stderr: string) => {
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
