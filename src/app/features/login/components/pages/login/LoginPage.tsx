import React from "react"
import styled from "styled-components"
import { themeSpacing, Button } from "@datapunt/asc-ui"

import DefaultLayout from "app/features/shared/components/layouts/DefaultLayout/DefaultLayout"
import ButtonLink from "app/features/shared/components/atoms/ButtonLink/ButtonLink"

const CenterWrap = styled.div`
  margin-top: ${ themeSpacing(50) };
  text-align: center;
`

const authUrl = process.env.REACT_APP_AUTH_URL ?? ""

const LoginPage: React.FC = () => (
    <DefaultLayout>
      <CenterWrap>
        <ButtonLink to={ authUrl }>
          <Button variant="primaryInverted">
            Log in met je ADW account
          </Button>
        </ButtonLink>
      </CenterWrap>
    </DefaultLayout>
  )

export default LoginPage
