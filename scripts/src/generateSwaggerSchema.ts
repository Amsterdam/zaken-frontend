#!/usr/bin/env ts-node-script
import { exec } from "child_process"
<<<<<<< HEAD
import { config } from "dotenv-flow"

=======

import slashSandwich from "slash-sandwich"
import { env } from "app/config/env"
>>>>>>> 42bfc866 (Change build to work for multiple environments)
// Loads .env.development or .env.production based on NODE_ENV

<<<<<<< HEAD
const url = `${ process.env.REACT_APP_API_HOST }${ process.env.REACT_APP_API_PATH }schema/`
=======

const url = slashSandwich([env.REACT_APP_API_HOST, env.REACT_APP_API_PATH, "schema"])
>>>>>>> 42bfc866 (Change build to work for multiple environments)

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
