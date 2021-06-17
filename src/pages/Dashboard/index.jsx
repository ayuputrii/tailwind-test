import React, { useState } from "react";
import "../../assets/main.css";
import {
  Header,
  NavHeader,
  NavHeaderMobile,
  TextArea,
  TextInput,
  Table,
} from "../../components";
import { useForm } from "react-hook-form";
import { useQuery, useMutation, useQueryClient } from "react-query";
import axios from "axios";

const SERVER_API = "http://localhost:2000/api/v1/product";

const Dashboard = () => {
  const queryClient = useQueryClient();
  const { register, handleSubmit, reset, clearErrors } = useForm();
  const [resultMessage, setResultMessage] = useState({
    type: "success",
    text: "",
    visible: false,
  });

  const { data } = useQuery(
    "getData",
    async () => {
      const res = await axios(`${SERVER_API}/get`);
      return res.data.data;
    },
    {
      staleTime: 15000,
      refetchInterval: 15000,
    }
  );

  const createProduct = async (form) => {
    try {
      const res = await axios.post(`${SERVER_API}/create`, {
        ...form,
      });
      return res.data;
    } catch {
      throw new Error("Error");
    }
  };

  const addProduct = useMutation(createProduct, {
    onMutate: async (newData) => {
      await queryClient.cancelQueries("getData");
      const previousData = queryClient.getQueryData("getData");
      if (previousData) {
        const finalData = [...previousData, newData];
        queryClient.setQueryData("getData", finalData);
      }
      return { previousData };
    },
    onSettled: async (result, err) => {
      if (result) {
        await queryClient.invalidateQueries("getData");
        clearErrors();
        reset({
          name: "",
          price: "",
          description: "",
        });
      }
      if (err) {
        console.log(err);
      }
    },
    onError: async (context) => {
      if (context?.previousProducts) {
        queryClient.setQueryData("getProduct", context.previousProducts);
      }
      setResultMessage({
        type: "error",
        text: "Failed Add Data",
        visible: true,
      });
    },
    onSuccess: async () => {
      setResultMessage({
        type: "success",
        text: "Success Add Data",
        visible: true,
      });
    },
  });

  const onCreate = (create) => {
    addProduct.mutate(create);
  };

  const deleteProduct = async (id) => {
    try {
      const res = await axios.delete(`${SERVER_API}/delete/${id}`);
      return res.data.data;
    } catch (err) {
      throw new Error("Error");
    }
  };

  const deleteMutation = useMutation(deleteProduct, {
    onMutate: async (id) => {
      await queryClient.cancelQueries("getData");
      const previousData = queryClient.getQueryData("getData");
      if (previousData) {
        const finalData = previousData.filter((x) => x.id !== id);
        queryClient.setQueryData("getData", finalData);
      }
      return { previousData };
    },
    onSettled: async (result, err) => {
      if (result) {
        await queryClient.invalidateQueries("getData");
      }
      if (err) {
        console.log(err);
      }
    },
    onError: async () => {},
    onSuccess: async () => {},
  });

  const onDelete = (deleteData) => {
    deleteMutation.mutate(deleteData);
  };

  return (
    <div>
      <nav className="bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <NavHeader />
        </div>
        <div className="md:hidden" id="mobile-menu">
          <NavHeaderMobile nameNavMobile="Dashboard" />
        </div>
      </nav>
      <header className="bg-white shadow">
        <Header nameHeader="Dashboard" />
      </header>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="border-4 border-dashed border-gray-200 rounded-lg">
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
                    <div className="shadow sm:rounded-md">
                      <div className="px-4 py-5 bg-white sm:p-6">
                        {resultMessage.visible &&
                          resultMessage.type === "error" && (
                            <div className="font-mono .. text-white bg-red-500 hover:bg-red-700 ...">
                              <p className="px-4">{resultMessage.text}</p>
                            </div>
                          )}
                        {resultMessage.visible &&
                          resultMessage.text &&
                          resultMessage.type === "success" && (
                            <div className="font-mono .. text-white bg-green-500 hover:bg-green-700 ... p-2 rounded-full mb-4">
                              <p className="px-4">{resultMessage.text}</p>
                            </div>
                          )}
                        <div className="grid grid-cols-6 gap-6">
                          <TextInput
                            type="text"
                            title="Name"
                            placeholder="input name product"
                            register={register}
                            name="name"
                            // {...register("name")}
                          />
                          <TextInput
                            type="number"
                            title="Price"
                            placeholder="input product price"
                            register={register}
                            name="price"
                          />
                          <TextArea
                            nameTextArea="Description"
                            placeholderTextArea="input product description"
                            register={register}
                            name="description"
                          />
                        </div>
                      </div>
                      <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                        <button
                          onClick={handleSubmit(onCreate)}
                          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-7">
                <div className="md:grid md:grid-cols-3 md:gap-6">
                  <div className="md:col-span-1">
                    <h3 className="text-lg font-medium leading-6 text-gray-900">
                      Table Product
                    </h3>
                    <p className="mt-1 text-sm text-gray-600">Show product</p>
                  </div>
                  <div className="mt-5 md:mt-0 md:col-span-2">
                    {data &&
                      Boolean(data?.length) &&
                      data.map((item) => (
                        <Table
                          key={item.id}
                          {...item}
                          // handleSubmit={handleSubmit}
                          onDelete={onDelete}
                        />
                      ))}
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
