
import { Routes, Route } from "react-router-dom";
import routes from "app/routing/routes"
import ProtectedPage from "./ProtectedPage"
import NotFoundPage from "app/pages/errors/NotFoundPage"


const Routing: React.FC = () => (
  <Routes>
    {
      Object
        .entries(routes)
        .map(([path, { publicly, Page, permissionNames }]) => (
          publicly ? <Route key={path} path={path} element={<Page />} />
            : (
              <Route
                key={path}
                path={path}
                element={<ProtectedPage permissionNames={permissionNames} page={Page} />}
              />
            )
          )
        )
    }
    <Route path="*" element={<NotFoundPage />} />
  </Routes>
)

export default Routing
