import React from "react";
import "../../assets/main.css";
import {
  Header,
  NavHeader,
  NavHeaderMobile,
  TextArea,
  TextInput,
} from "../../components";

const Dashboard = () => {
  return (
    <div>
      <nav class="bg-gray-800">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <NavHeader />
        </div>
        <div class="md:hidden" id="mobile-menu">
          <NavHeaderMobile nameNavMobile="Dashboard" />
        </div>
      </nav>
      <header class="bg-white shadow">
        <Header nameHeader="Dashboard" />
      </header>
      <main>
        <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div class="px-4 py-6 sm:px-0">
            <div class="border-4 border-dashed border-gray-200 rounded-lg">
              <div className="p-7">
                <div className="md:grid md:grid-cols-3 md:gap-6">
                  <div className="md:col-span-1">
                    <h3 className="text-lg font-medium leading-6 text-gray-900">
                      Form Product
                    </h3>
                    <p className="mt-1 text-sm text-gray-600">
                      input your product
                    </p>
                  </div>
                  <div className="mt-5 md:mt-0 md:col-span-2">
                    <form action="#" method="POST">
                      <div className="shadow overflow-hidden sm:rounded-md">
                        <div className="px-4 py-5 bg-white sm:p-6">
                          <div className="grid grid-cols-6 gap-6">
                            <TextInput
                              type="text"
                              title="Name"
                              placeholder="input name product"
                            />
                            <TextInput
                              type="number"
                              title="Price"
                              placeholder="input product price"
                            />
                            <TextArea
                              nameTextArea="Description"
                              placeholderTextArea="input product description"
                            />
                          </div>
                        </div>
                        <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                          <button
                            type="submit"
                            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                          >
                            Save
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
