#!/usr/bin/env ts-node-script
import fs from "fs"
import { config } from "dotenv-flow"
import { fetchSchema, getSchemaObjects, parseOpenApiSchema } from "@amsterdam/scaffold-form"
import slashSandwich from "slash-sandwich"


// Loads .env.development or .env.production based on NODE_ENV
config()

const writeToFile = (filename: string, obj: any) => {
  console.log(`\t"${ filename }"`)
  const path = "./src/__generated__/"

  if (!fs.existsSync(path)) {
    fs.mkdirSync(path)
  }

  fs.writeFileSync(path + filename, JSON.stringify(obj, null, 2))
}

const writeSchemas = (schema: any) => {
  const schemaObjects = getSchemaObjects(schema)

  console.log("-----")
  console.log("Found schemas:")
  console.log("-----")
  console.log(Object.keys(schemaObjects).map(_ => `\t"${ _ }"`).join("\n"))
  console.log("-----")
  console.log("Writing schemas:")
  console.log("-----")

  // Write
  // NOTE: add your own cases here:
  // ----

  writeToFile("FormCases.json", parseOpenApiSchema(schemaObjects["POST /api/v1/cases/"]))

  // DONE!
  // ----
  console.log("-----")
  console.log("DONE")
}

fetchSchema(
  slashSandwich([process.env.REACT_APP_GATEWAY, "schema"])
).then(
  writeSchemas,
  () => process.exit(1)
)
