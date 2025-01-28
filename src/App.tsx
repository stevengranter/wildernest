//React and ReactDOM
import ReactDOM from "react-dom/client"
import { StrictMode } from "react"

// Third-party libraries
import { RouterProvider } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ColorSchemeScript, MantineProvider } from "@mantine/core"
import { ModalsProvider } from "@mantine/modals"
import { Notifications } from "@mantine/notifications"

// Stylesheets
import "@mantine/core/styles.css"
import "@mantine/notifications/styles.css"

// Internal modules
import { fetchServerData } from "~/features/_shared/api/fetchServerData.ts"
import {
  CollectionsProvider,
  NestProvider,
} from "~/features/_shared/contexts/index.ts"
import { router } from "routes.tsx"
import { defaultTheme } from "theme/defaultTheme"

// Initialize React Query Client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: ({ queryKey }) => fetchServerData(queryKey),
    },
  },
})

// Render React Application
const rootElement = document.getElementById("root")!
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <NestProvider>
          <CollectionsProvider>
            <ColorSchemeScript defaultColorScheme="light" />
            <MantineProvider defaultColorScheme="light" theme={defaultTheme}>
              <ModalsProvider />
              <Notifications />
              <RouterProvider router={router} />
            </MantineProvider>
          </CollectionsProvider>
        </NestProvider>
      </QueryClientProvider>
    </StrictMode>,
  )
}
