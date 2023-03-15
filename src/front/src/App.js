import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"
import { Provider } from 'react-redux'
import Store from './redux/store'

import Home from "./pages/Home"
// import PageB from "./pages/PageB"


const App = () => {
    return (
        <Provider store={Store}>
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    {/* <Route path="/pageb" element={<PageB />} /> */}
                </Routes>
            </Router>
        </Provider>
        
        
    )
}


export default App