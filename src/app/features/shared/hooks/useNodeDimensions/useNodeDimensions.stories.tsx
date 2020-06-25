import React from "react"
import { withKnobs, text } from "@storybook/addon-knobs"
import styled from "styled-components"
import { themeColor, themeSpacing } from "@datapunt/asc-ui"
import useNodeByReference from "../useNodeByReference/useNodeByReference"
import useNodeDimensions from "./useNodeDimensions"

export default {
  title: "Shared/Hooks/useNodeDimensions",
  decorators: [withKnobs]
}

const Card = styled.div`
  display: inline-block;
  padding: 0 ${ themeSpacing(5) } ${ themeSpacing(5) } ${ themeSpacing(5) };
  margin: ${ themeSpacing(5) } 0;
  background-color: ${ themeColor("tint", "level3") }
`

export const Example: React.FC  = () => {
  const { ref, node } = useNodeByReference<HTMLDivElement>()
  const dimensions = useNodeDimensions(node)

  return <>
    <p>
      Please change the content using the knobs below.
    </p>
    <div>
      <Card ref={ref}>
        <h4>Content</h4>
        { text("content", "Lorem") }
      </Card>
    </div>
    <div>
      <pre>// Dimensions:</pre>
      <pre>
        {/*
          IE11 cant seem to stringify the dimensions object.
          That's why we unpack it manually here.
        */}
        { JSON.stringify({
          x: dimensions?.x,
          y: dimensions?.y,
          width: dimensions?.width,
          height:dimensions?.height,
          top: dimensions?.top,
          bottom: dimensions?.bottom
        }, null, 2) }
      </pre>
    </div>
  </>
}


