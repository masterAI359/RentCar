const Filter = () => {
  return (

      <div className="bg-white sticky top-5 scroll-m-9">
   
            <div className="sticky top-0 left-0 right-0  ">
              <div className=" flex h-full w-full lg:max-w-[350px]  flex-col  bg-white py-4 pb-12 shadow-xl">
                <div className="flex items-center justify-between px-4">
                  <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                  <button
                    type="button"
                    className="-mr-2 md:hidden flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                  >
                    <span className="sr-only">Close menu</span>
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>

                {/* <!-- Filters --> */}
                <form className="mt-4 border-t border-gray-200">
                  <h3 className="sr-only">Categories</h3>
                  <ul
                    role="list"
                    className="px-2 py-3 font-medium text-gray-900"
                  >
                    <li>
                      <a href="#" className="block px-2 py-3">
                        Totes
                      </a>
                    </li>
                    <li>
                      <a href="#" className="block px-2 py-3">
                        Backpacks
                      </a>
                    </li>
                    <li>
                      <a href="#" className="block px-2 py-3">
                        Travel Bags
                      </a>
                    </li>
                    <li>
                      <a href="#" className="block px-2 py-3">
                        Hip Bags
                      </a>
                    </li>
                    <li>
                      <a href="#" className="block px-2 py-3">
                        Laptop Sleeves
                      </a>
                    </li>
                  </ul>

                  <div className="border-t border-gray-200 px-4 py-6">
                    <h3 className="-mx-2 -my-3 flow-root">
                      {/* <!-- Expand/collapse section button --> */}
                      <button
                        type="button"
                        className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500"
                        aria-controls="filter-section-mobile-0"
                        aria-expanded="false"
                      >
                        <span className="font-medium text-gray-900">Color</span>
                        <span className="ml-6 flex items-center">
                          {/* <!-- Expand icon, show/hide based on section open state. --> */}
                          <svg
                            className="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                          >
                            <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
                          </svg>
                          {/* <!-- Collapse icon, show/hide based on section open state. --> */}
                          <svg
                            className="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10.75 3.25a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </span>
                      </button>
                    </h3>
                    {/* <!-- Filter options, show/hide based on section open state. --> */}
                    <div
                      className="mt-6 grid grid-cols-2 gap-x-4"
                      id="filter-section-mobile-0"
                    >
                      <label className="flex items-center text-sm font-medium text-gray-900">
                        <input
                          type="checkbox"
                          className="form-checkbox"
                          name="color[]"
                          value="red"
                        />
                        <span className="ml-2">Red</span>
                      </label>
                      <label className="flex items-center text-sm font-medium text-gray-900">
                        <input
                          type="checkbox"
                          className="form-checkbox"
                          name="color[]"
                          value="blue"
                        />
                        <span className="ml-2">Blue</span>
                      </label>
                      <label className="flex items-center text-sm font-medium text-gray-900">
                        <input
                          type="checkbox"
                          className="form-checkbox"
                          name="color[]"
                          value="green"
                        />
                        <span className="ml-2">Green</span>
                      </label>
                      <label className="flex items-center text-sm font-medium text-gray-900">
                        <input
                          type="checkbox"
                          className="form-checkbox"
                          name="color[]"
                          value="yellow"
                        />
                        <span className="ml-2">Yellow</span>
                      </label>
                      <label className="flex items-center text-sm font-medium text-gray-900">
                        <input
                          type="checkbox"
                          className="form-checkbox"
                          name="color[]"
                          value="purple"
                        />
                        <span className="ml-2">Purple</span>
                      </label>
                      <label className="flex items-center text-sm font-medium text-gray-900">
                        <input
                          type="checkbox"
                          className="form-checkbox"
                          name="color[]"
                          value="black"
                        />
                        <span className="ml-2">Black</span>
                      </label>
                      <label className="flex items-center text-sm font-medium text-gray-900">
                        <input
                          type="checkbox"
                          className="form-checkbox"
                          name="color[]"
                          value="white"
                        />
                        <span className="ml-2">White</span>
                      </label>
                      <label className="flex items-center text-sm font-medium text-gray-900">
                        <input
                          type="checkbox"
                          className="form-checkbox"
                          name="color[]"
                          value="gray"
                        />
                        <span className="ml-2">Gray</span>
                      </label>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 px-4 py-6">
                    <h3 className="-mx-2 -my-3 flow-root">
                      {/* <!-- Expand/collapse section button --> */}
                      <button
                        type="button"
                        className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500"
                        aria-controls="filter-section-mobile-1"
                        aria-expanded="false"
                      >
                        <span className="font-medium text-gray-900">Size</span>
                        <span className="ml-6 flex items-center">
                          {/* <!-- Expand icon, show/hide based on section open state. --> */}
                          <svg
                            className="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                          >
                            <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
                          </svg>
                          {/* <!-- Collapse icon, show/hide based on section open state. --> */}
                          <svg
                            className="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10.75 3.25a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </span>
                      </button>
                    </h3>
                    {/* <!-- Filter options, show/hide based on section open state. --> */}
                    <div
                      className="mt-6 grid grid-cols-2 gap-x-4"
                      id="filter-section-mobile-1"
                    >
                      <label className="flex items-center text-sm font-medium text-gray-900">
                        <input
                          type="checkbox"
                          className="form-checkbox"
                          name="size[]"
                          value="small"
                        />
                        <span className="ml-2">Small</span>
                      </label>
                      <label className="flex items-center text-sm font-medium text-gray-900">
                        <input
                          type="checkbox"
                          className="form-checkbox"
                          name="size[]"
                          value="medium"
                        />
                        <span className="ml-2">Medium</span>
                      </label>
                      <label className="flex items-center text-sm font-medium text-gray-900">
                        <input
                          type="checkbox"
                          className="form-checkbox"
                          name="size[]"
                          value="large"
                        />
                        <span className="ml-2">Large</span>
                      </label>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 px-4 py-6">
                    <h3 className="-mx-2 -my-3 flow-root">
                      {/* <!-- Expand/collapse section button --> */}
                      <button
                        type="button"
                        className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500"
                        aria-controls="filter-section-mobile-2"
                        aria-expanded="false"
                      >
                        <span className="font-medium text-gray-900">Price</span>
                        <span className="ml-6 flex items-center">
                          {/* <!-- Expand icon, show/hide based on section open state. --> */}
                          <svg
                            className="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                          >
                            <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
                          </svg>
                          {/* <!-- Collapse icon, show/hide based on section open state. --> */}
                          <svg
                            className="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10.75 3.25a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </span>
                      </button>
                    </h3>
                    {/* <!-- Filter options, show/hide based on section open state. --> */}
                    <div
                      className="mt-6 grid grid-cols-2 gap-x-4"
                      id="filter-section-mobile-2"
                    >
                      <label className="flex items-center text-sm font-medium text-gray-900">
                        <input
                          type="radio"
                          className="form-radio"
                          name="price"
                          value="0-25"
                        />
                        <span className="ml-2">$0 - $25</span>
                      </label>
                      <label className="flex items-center text-sm font-medium text-gray-900">
                        <input
                          type="radio"
                          className="form-radio"
                          name="price"
                          value="25-50"
                        />
                        <span className="ml-2">$25 - $50</span>
                      </label>
                      <label className="flex items-center text-sm font-medium text-gray-900">
                        <input
                          type="radio"
                          className="form-radio"
                          name="price"
                          value="50-100"
                        />
                        <span className="ml-2">$50 - $100</span>
                      </label>
                      <label className="flex items-center text-sm font-medium text-gray-900">
                        <input
                          type="radio"
                          className="form-radio"
                          name="price"
                          value="100-200"
                        />
                        <span className="ml-2">$100 - $200</span>
                      </label>
                      <label className="flex items-center text-sm font-medium text-gray-900">
                        <input
                          type="radio"
                          className="form-radio"
                          name="price"
                          value="200-plus"
                        />
                        <span className="ml-2">$200+</span>
                      </label>
                    </div>
                  </div>
                </form>
              </div>
            </div>
      
        </div>
 

  );
};

export default Filter;
