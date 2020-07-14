import React from "react"
import styled from "styled-components"
import { themeSpacing, Button } from "@datapunt/asc-ui"

import DefaultLayout from "app/features/shared/components/layouts/DefaultLayout/DefaultLayout"


const CenterWrap = styled.div`
  margin-top: ${ themeSpacing(50) };
  text-align: center;
`

const authUrl = process.env.REACT_APP_AUTH_URL ?? ""

const LoginPage: React.FC = () => (
    <DefaultLayout>
      <CenterWrap>
        <Button as="a" href={authUrl} variant="primaryInverted">
          Log in met je ADW account
        </Button>
      </CenterWrap>
    </DefaultLayout>
  )

export default LoginPage
