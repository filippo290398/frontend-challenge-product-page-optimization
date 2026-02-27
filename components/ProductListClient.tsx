"use client";

import { Fragment, useState, useMemo } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { Product } from "@/types/product";
import ProductCard from "./ProductCard";

interface Props {
  products: Product[];
  categories: { slug: string; name: string }[];
}

// Helper to merge Tailwind classes conditionally
function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function ProductListClient({ products, categories }: Props) {
  const [selectedCategory, setSelectedCategory] = useState<{
    slug: string;
    name: string;
  }>({
    slug: "all",
    name: "All Categories",
  });
  const [sortOrder, setSortOrder] = useState<{
    value: "asc" | "desc";
    label: string;
  }>({
    value: "asc",
    label: "Price: Low to High",
  });

  const sortOptions = [
    { value: "asc", label: "Price: Low to High" },
    { value: "desc", label: "Price: High to Low" },
  ];

  const categoryOptions = [
    { slug: "all", name: "All Categories" },
    ...categories,
  ];

  const filteredProducts = useMemo(() => {
    const filtered =
      selectedCategory.slug === "all"
        ? products
        : products.filter((p) => p.category === selectedCategory.slug);

    return filtered.sort((a, b) => {
      if (sortOrder.value === "asc") return a.price - b.price;
      else return b.price - a.price;
    });
  }, [products, selectedCategory, sortOrder]);

  return (
    <div>
      {/* Filter and Sort Controls */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        {/* Category Listbox */}
        <Listbox value={selectedCategory} onChange={setSelectedCategory}>
          {({ open }) => (
            <>
              <Listbox.Label className="block text-sm font-medium text-gray-700 sr-only">
                Category
              </Listbox.Label>
              <div className="relative w-full sm:w-64">
                <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-2 pl-3 pr-10 text-left border border-gray-300 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm">
                  <span className="block truncate">
                    {selectedCategory.name}
                  </span>
                  <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                    <ChevronUpDownIcon
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </span>
                </Listbox.Button>

                <Transition
                  show={open}
                  as={Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                    {categoryOptions.map((cat, index) => (
                      <Listbox.Option
                        key={index}
                        className={({ active }) =>
                          classNames(
                            active
                              ? "bg-indigo-600 text-white"
                              : "text-gray-900",
                            "relative cursor-default select-none py-2 pl-3 pr-9"
                          )
                        }
                        value={cat}
                      >
                        {({ selected, active }) => (
                          <>
                            <span
                              className={classNames(
                                selected ? "font-semibold" : "font-normal",
                                "block truncate"
                              )}
                            >
                              {cat.name}
                            </span>

                            {selected ? (
                              <span
                                className={classNames(
                                  active ? "text-white" : "text-indigo-600",
                                  "absolute inset-y-0 right-0 flex items-center pr-4"
                                )}
                              >
                                <CheckIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              </span>
                            ) : null}
                          </>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Transition>
              </div>
            </>
          )}
        </Listbox>

        {/* Sort Listbox */}
        <Listbox value={sortOrder} onChange={setSortOrder}>
          {({ open }) => (
            <>
              <Listbox.Label className="block text-sm font-medium text-gray-700 sr-only">
                Sort by
              </Listbox.Label>
              <div className="relative w-full sm:w-64">
                <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-2 pl-3 pr-10 text-left border border-gray-300 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm">
                  <span className="block truncate">{sortOrder.label}</span>
                  <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                    <ChevronUpDownIcon
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </span>
                </Listbox.Button>

                <Transition
                  show={open}
                  as={Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                    {sortOptions.map((option) => (
                      <Listbox.Option
                        key={option.value}
                        className={({ active }) =>
                          classNames(
                            active
                              ? "bg-indigo-600 text-white"
                              : "text-gray-900",
                            "relative cursor-default select-none py-2 pl-3 pr-9"
                          )
                        }
                        value={option}
                      >
                        {({ selected, active }) => (
                          <>
                            <span
                              className={classNames(
                                selected ? "font-semibold" : "font-normal",
                                "block truncate"
                              )}
                            >
                              {option.label}
                            </span>

                            {selected ? (
                              <span
                                className={classNames(
                                  active ? "text-white" : "text-indigo-600",
                                  "absolute inset-y-0 right-0 flex items-center pr-4"
                                )}
                              >
                                <CheckIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              </span>
                            ) : null}
                          </>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Transition>
              </div>
            </>
          )}
        </Listbox>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
