import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./Pages/Home";
import About from "./Pages/About";
import Signin from "./Pages/Signin";
import Signup from "./Pages/Signup";
import Dashboard from "./Pages/Dashboard";
import Header from "./Components/Header";
import Footers from "./Components/Footers";
import PrivetRoute from "./Components/PrivetRoute";
import AdminPrivateRoute from "./Components/AdminPrivateRoute";
import CreatePost from "./Pages/CreatePost";
import UpdatePost from "./Pages/UpdatePost";
import PostPage from "./Pages/PostPage";
import ScrollToTop from "./Components/ScrollToTop";
import Search from "./Pages/Search";
import TermsAndConditions from "./Pages/TermsAndConditions";
import PrivacyPolicy from "./Pages/PrivacyPolicy";
import Projects from "./Pages/Projects";

function App() {
  return (
    <div className="max-w-7xl mx-auto">
      <BrowserRouter>
        <ScrollToTop />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/about" element={<About />} />
          <Route path="/sign-in" element={<Signin />} />
          <Route path="/sign-up" element={<Signup />} />
          <Route path="/search" element={<Search />} />
          <Route path="/post/:postSlug" element={<PostPage />} />
          <Route path="/termsAndConditions" element={<TermsAndConditions />} />
          <Route path="/privacyPolicy" element={<PrivacyPolicy />} />
          <Route element={<PrivetRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
          <Route element={<AdminPrivateRoute />}>
            <Route path="/create-post" element={<CreatePost />} />
            <Route path="/update-post/:postId" element={<UpdatePost />} />
          </Route>
        </Routes>
        <Footers />
      </BrowserRouter>
    </div>
  );
}

export default App;
