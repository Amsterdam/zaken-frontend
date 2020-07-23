import React from "react"


import Details from "./Details"

export default {
  title: "Shared/Molecules/Details"
}


export const Example = () =>
  <div>
    <p>Example of a basic details component</p>
    <Details
      title="Ultricies Parturient Amet"
      values={{
        "Malesuada Vestibulum": "Elit Mattis",
        "Ultricies Parturient": "Malesuada Dapibus",
        "Sollicitudin Lorem Fermentum": 1000,
        "Commodo Fringilla": "Inceptos Pharetra"
      }}
    />
  </div>

