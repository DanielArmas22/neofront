import { useSession } from 'next-auth/react';
import Layout from '../../components/layout/dashboard';
import Loader from '../../components/loaders/loader';
import { useStrapiData } from '../../services/strapiServiceJWT';
import { UserIcon } from '@heroicons/react/24/outline';
import ProfileForm from '../profile/profileForm';
import LogoGravatar from "../../components/LogoGravatar";
import React, { useState, useEffect } from "react";

import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/solid";
import useSWR, { mutate } from "swr";

const ProfilePage = () => {

  
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    country: "",
    city: "",
    street: "",
    zipCode: "",
  });

  const [error, setError] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    country: "",
    city: "",
    street: "",
    zipCode: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const { data: session } = useSession();
  const token = session?.jwt;

  const { data, error: fetchError, isLoading } = useStrapiData('users/me', token);




  const handleChange = (e) => {
    const { name, value } = e.target;

    // Validar que el teléfono no contenga letras
    if (name === "phone" && !/^\d*$/.test(value)) {
      setError((prev) => ({ ...prev, [name]: "El teléfono solo debe contener números." }));
      setTimeout(() => setError((prev) => ({ ...prev, [name]: "" })), 2000);
      return;
    }

    // Validar que los textos no sean demasiado largos
    if (value.length > 50 && (name === "firstName" || name === "lastName" || name === "city" || name === "street")) {
      setError((prev) => ({ ...prev, [name]: "El campo no debe exceder los 50 caracteres." }));
      setTimeout(() => setError((prev) => ({ ...prev, [name]: "" })), 2000);
      return;
    }

    if (value.length > 10 && name === "zipCode") {
      setError((prev) => ({ ...prev, [name]: "El código postal no debe exceder 10 caracteres." }));
      setTimeout(() => setError((prev) => ({ ...prev, [name]: "" })), 2000);
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleCountryChange = (value) => {
    setFormData((prev) => ({ ...prev, country: value.alpha3 }));
  };




  const handleSubmit = async (e) => {
    e.preventDefault();
  
    console.log("Datos enviados a Strapi:", JSON.stringify(formData, null, 2));
  
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/101`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          data: {  // Strapi espera los datos dentro de un objeto `data`
            firstName: formData.firstName,
            lastName: formData.lastName,
            phone: formData.phone,
            country: formData.country,
            city: formData.city,
            street: formData.street,
            zipCode: formData.zipCode,
          }
        }),
        
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error en la respuesta de Strapi:", errorData);
  
        throw new Error(`Error ${response.status} - ${errorData?.error?.message || "Error desconocido"}`);
      }
  
      const updatedData = await response.json();
      console.log("Respuesta de Strapi:", updatedData);
  
      setSuccess("Datos actualizados correctamente.");
      setTimeout(() => setSuccess(""), 3000);
  
   
 
  
    } catch (error) {
      console.error("Error en handleSubmit:", error);
      setErrors({ form: error.message });
      setTimeout(() => setErrors({ form: "" }), 3000);
    } finally {
      setLoading(false);
    }
  };
  



  useEffect(() => {
    if (data) {
      setFormData({
        firstName: data.firstName || "",
        lastName: data.lastName || "",
        phone: data.phone || "",
        country: data.country || "",
        city: data.city || "",
        street: data.street || "",
        zipCode: data.zipCode || "",
      });
    }
  }, [data]);

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      const timer = setTimeout(() => {
        setErrors({});
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [errors]);

  if (isLoading) {
    return (
      <Layout>
        <Loader />
      </Layout>
    );
  }

  if (fetchError) {
    return <Layout>Error al cargar los datos: {fetchError.message}</Layout>;
  }

  return (
    <Layout>
      <div className="p-6 dark:bg-zinc-800 bg-white shadow-md rounded-lg dark:text-white dark:border-zinc-700 dark:shadow-black">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <UserIcon className="w-6 h-6 text-gray-600 dark:text-gray-200" />
            <h1 className="text-xl font-semibold">Perfil</h1>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <p className="text-lg font-semibold mb-4">Información de Cuenta</p>
      </div>

      <div className="flex flex-col items-center p-6 dark:bg-black bg-white shadow-md rounded-lg dark:text-white dark:border-zinc-700 dark:shadow-black">
        <LogoGravatar
          email={session.user.email || "usuario@example.com"}
          className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mb-4"
        />
        <h1 className="text-3xl font-bold dark:text-white text-slate-700 mb-2">
         @{data.username || "Username no disponible"}
        </h1>
        <p className="dark:text-white text-gray-400 text-sm mb-8">
          Fecha de creación:{" "}
          {data.createdAt
            ? new Date(data.createdAt).toLocaleDateString()
            : "No disponible"}
        </p>

        <div className="w-full space-y-6 bg-gray-100 p-6 rounded-lg dark:bg-zinc-800">

          <div className="flex flex-col md:flex-row items-center">
            <div className="w-full md:w-1/4 mb-2 md:mb-0">
              <label className="text-base font-semibold text-black dark:text-white">
                Email
              </label>
            </div>
            <div className="w-full md:w-3/4">
              <p className="text-gray-700 dark:text-white">
                {data.email || "Correo no disponible"}
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center">
            <div className="w-full md:w-1/4 mb-2 md:mb-0">
              <label className="text-base font-semibold text-black dark:text-white">
                Cuenta verificada
              </label>
            </div>

            <div className="w-full md:w-3/4 flex items-center space-x-2">
              {data.isVerified ? (
                <CheckCircleIcon className="w-6 h-6 text-green-500" />
              ) : (
                <XCircleIcon className="w-6 h-6 text-red-500" />
              )}
              <p className="text-gray-700 dark:text-white">
                {data.isVerified ? "Verificado" : "No verificado"}
              </p>
            </div>

          </div>
        </div>
      </div>
      <ProfileForm formData={formData} setFormData={setFormData} token={token} />

    </Layout>
  );
};

export default ProfilePage;