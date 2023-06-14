'use client'

import {
    RecoilRoot,
  } from 'recoil';

  export const RecoilRootC = ({children}: {
    children: React.ReactNode
  }) => {
    return (
      <RecoilRoot>
      {children}
    </RecoilRoot>
    )
  }

//   export default {RecoilRootC}