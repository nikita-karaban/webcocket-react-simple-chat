import React from 'react';
import { Redirect } from "react-router-dom"

export default function RequireAuth(Component) {
  return function Guard({...props}) {
    const hasUser = sessionStorage.getItem("nickname")

    return (
      <>
        {hasUser ? <Component {...props}/> : <Redirect to={"/"}/>}
      </>
    )
  }
}