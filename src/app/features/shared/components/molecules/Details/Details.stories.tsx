import React from "react"


import Details from "./Details"
import LoadingDetails from "./LoadingDetails"

export default {
  title: "Shared/Molecules/Details"
}


export const Example = () =>
  <Details
    title="Ultricies Parturient Amet"
    values={{
      "Malesuada Vestibulum": "Elit Mattis",
      "Ultricies Parturient": "Malesuada Dapibus",
      "Sollicitudin Lorem Fermentum": 1000,
      "Commodo Fringilla": "Inceptos Pharetra"
    }}
  />


export const LoadingExample = () =>
  <Details
    isLoading={true}
    title="Ultricies Parturient Amet"
    values={{
      "Malesuada Vestibulum": "Elit Mattis",
      "Ultricies Parturient": "Malesuada Dapibus",
      "Sollicitudin Lorem Fermentum": 1000,
      "Commodo Fringilla": "Inceptos Pharetra"
    }}
  />

export const LoadingAliasExample = () =>
  <div>
    <p>Example of a basic details component</p>
    <LoadingDetails numRows={10} />
  </div>


export const CollapsibleExample = () => <Details
  numInitialVisibleRows={2}
  title="Ultricies Parturient Amet"
  values={{
    "Malesuada Vestibulum": "Elit Mattis",
    "Ultricies Parturient": "Malesuada Dapibus",
    "Sollicitudin Lorem Fermentum": 1000,
    "Commodo Fringilla": "Inceptos Pharetra"
  }}
/>
