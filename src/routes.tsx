import React from "react"
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom"

import { WildCard } from "~/features/card/components/WildCard/WildCard.tsx"
import CardsPage from "~/features/card/pages/CardsPage.tsx"
import WelcomePage from "~/features/home/pages/WelcomePage.tsx"
import SearchPage from "~/features/search/pages/SearchPage.tsx"
import UserManagement from "~/features/user-management/components/UserManagement.tsx"
import DefaultLayout from "~/theme/DefaultLayout.tsx"
import DevPage from "~/features/dev/DevPage.tsx"
import NestView2 from "./features/card/NestView2"

export const router: ReturnType<typeof createBrowserRouter> =
  createBrowserRouter(
    createRoutesFromElements(
      <Route element={<DefaultLayout />} path="/">
        <Route element={<WelcomePage />} index></Route>
        <Route element={<NestView2 />} path="collections"></Route>
        /* /users */
        <Route path="users">
          <Route element={<UserManagement />} index></Route>
        </Route>
        /* /cards */
        <Route path="cards">
          <Route element={<CardsPage />} index></Route>
          /* /cards/:cardId */
          <Route path=":cardId">
            <Route element={<WildCard />} index></Route>
          </Route>
        </Route>
        <Route path="search">
          <Route element={<SearchPage />} index></Route>
        </Route>
        <Route path="dev">
          <Route element={<DevPage />} index></Route>
        </Route>
      </Route>,
    ),
    {
      future: {
        v7_relativeSplatPath: true,
        v7_fetcherPersist: true,
        v7_normalizeFormMethod: true,
        v7_partialHydration: true,
        v7_skipActionErrorRevalidation: true,
      },
    },
  )
