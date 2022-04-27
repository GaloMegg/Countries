import { Route, Routes } from "react-router-dom";
import Content from "./content/Content";
import Form from "./Form/Form";
import Landing from "./Landing";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home/*" element={<Content />} />

      </Routes>
      {/* 
      <Content />
      <Form /> */}
    </>
  );
}

export default App;
