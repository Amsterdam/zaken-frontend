#!/usr/bin/env ts-node-script

const { fetchSchema, getSchemaObjects, parseOpenApiSchema } = require("amsterdam-scaffold-form")
const fs = require("fs")

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

  writeToFile("POST_Cases.json", parseOpenApiSchema(schemaObjects["POST /api/v1/cases/"]))
  writeToFile("PUT_Cases.json", parseOpenApiSchema(schemaObjects["PUT /api/v1/cases/{uuid}/"]))

  // DONE!
  // ----
  console.log("-----")
  console.log("DONE")
}

// TODO URL should come from .env file.
fetchSchema("http://localhost:8080/api/v1/schema/")
  .then(writeSchemas, (...args: any[]) => console.log(args))

export {}
