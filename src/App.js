import { Fragment, useState, useEffect } from "react";
import ProductForm from "./components/productForm/ProductForm";
import FilterData from "./components/filterData/FilterData";
import RenderData from "./components/renderData/RenderData";

const App = () => {
  // Setting states for lists of products, categories and filter query
  const [list, setList] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filterCategory, setFilterCategory] = useState("");
  const [filteredList, setFilteredList] = useState(list);

  // Adding new product to list and setting new category for filtering (if it doesn't already exist)
  const addNewProduct = (product) => {
    setList((list) => [...list, product]);
    if (categories.includes(product.category.toLowerCase())) {
      return;
    } else {
      setCategories((categories) => [
        ...categories,
        product.category.toLowerCase(),
      ]);
    }
  };

  // Using filter and setting filtered list
  const useFilter = () => {
    if (filterCategory === "") {
      setFilteredList(list);
    } else {
      const filteredProducts = list.filter(
        (product) => product.category === filterCategory
      );
      setFilteredList(filteredProducts);
    }
  };

  useEffect(useFilter, [filterCategory, list]);

  // Returning components and showing them in DOM, sending props to other components
  // Showing buttons with categories to filter only if list of categories exists
  return (
    <Fragment>
      <main>
        <div className="app-container">
          <div className="title-container">
            <h1>Fridge App</h1>
          </div>
          <div className="main-container">
            <ProductForm addNewProduct={addNewProduct}></ProductForm>
            {categories.length > 0 ? (
              <FilterData
                categories={categories}
                filterCategory={filterCategory}
                setFilterCategory={setFilterCategory}
              ></FilterData>
            ) : null}
            <RenderData filteredList={filteredList}></RenderData>
          </div>
        </div>
      </main>
    </Fragment>
  );
};

export default App;
