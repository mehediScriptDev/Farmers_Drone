import { RouterProvider } from "react-router-dom";
import { AppRoutes } from "./router/AppRoutes";
import ScrollToTop from "./components/utility/ScrollToTop";

const App = () => {
    return (
        <>
            <ScrollToTop/>
            <RouterProvider router={AppRoutes} />
        </>
    );
};

export default App;