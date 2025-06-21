import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import "primereact/resources/themes/lara-light-teal/theme.css"
import { Provider } from 'react-redux'
import store from './redux/store/index.ts'
import { RouterProvider } from 'react-router'
import routes from './routes/index.tsx'
import { PrimeReactProvider } from 'primereact/api';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <PrimeReactProvider>
        <RouterProvider router={routes} />
      </PrimeReactProvider>
    </Provider>
  </StrictMode>,
)
