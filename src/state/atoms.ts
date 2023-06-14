'use client'

import { atom } from "recoil";

export const userState = atom({
    key: 'User',
    default: 'value is ',
  });