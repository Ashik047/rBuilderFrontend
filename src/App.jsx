import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import ResumeGenerator from "./pages/ResumeGenerator";
import History from "./pages/History";
import PageNotFound from "./pages/PageNotFound";
import Form from "./components/Form";
import Edit from "./components/Edit";
import Preview from "./components/Preview";


function App() {


  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/resumeGenerator" element={<ResumeGenerator />} />
        <Route path="/history" element={<History />} />
        <Route path="/form" element={<Form />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
