#!/usr/bin/env ts-node-script
import { exec } from "child_process"
import { config } from "dotenv-flow"

// Loads .env.development or .env.production based on NODE_ENV
config()

const url = `${ process.env.REACT_APP_API_HOST }${ process.env.REACT_APP_API_PATH }schema/`

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
