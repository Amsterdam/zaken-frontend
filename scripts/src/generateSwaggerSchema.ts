#!/usr/bin/env ts-node-script
import { exec } from "child_process"

const url = "http://localhost:8080/api/v1/schema/"
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
