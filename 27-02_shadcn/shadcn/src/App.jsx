import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sidebar } from "@/components/ui/sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";

const SidebarComponent = ({ categories, onSelectCategory }) => {
  return (
    <Sidebar className="w-64 p-4 border-r border-gray-300">
      <h2 className="text-xl font-semibold mb-4">Categories</h2>
      <ScrollArea className="h-[80vh]">
        <ul className="space-y-2">
          <li>
            <Button
              variant="ghost"
              className="w-full"
              onClick={() => onSelectCategory("")}
            >
              All
            </Button>
          </li>
          {categories.map((category) => (
            <li key={category}>
              <Button
                variant="ghost"
                className="w-full"
                onClick={() => onSelectCategory(category)}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </Button>
            </li>
          ))}
        </ul>
      </ScrollArea>
    </Sidebar>
  );
};

export default function App() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data));

    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setFilteredProducts(data);
      });
  }, []);

  const handleCategorySelect = (category) => {
    if (category === "") {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter((p) => p.category === category));
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <SidebarComponent
        categories={categories}
        onSelectCategory={handleCategorySelect}
      />
      <div className="p-6 flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredProducts.map((product) => (
          <Card key={product.id} className="p-4">
            <CardContent>
              <img
                src={product.image}
                alt={product.title}
                className="h-40 mx-auto"
              />
              <h3 className="mt-2 font-semibold text-lg">{product.title}</h3>
              <p className="text-gray-500">${product.price}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
