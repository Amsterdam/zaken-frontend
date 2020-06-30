import React from "react"
import { Redirect, RouteComponentProps } from "@reach/router"

const HomePage: React.FC<RouteComponentProps> = () => (<Redirect to="/cases" />)

export default HomePage
