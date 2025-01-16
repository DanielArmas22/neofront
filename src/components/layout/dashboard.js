import React from 'react';
import Navbar from "../structure/navbar";
import FooterInfo from "../structure/footer";
import Sidebar from '../structure/sidebar';


import WhatsAppButton from "../structure/WhatsAppButton";

export default function Layout({ children, title, showButton, NoTab }) {
    return (
        <>
            <div className="min-h-full">

                <Navbar />



                <main>


                    {/* Estructura central */}



                    <div className="mx-auto max-w-7xl py-12 px-4 sm:px-6 lg:px-8">


                        <div className="flex flex-col md:flex-row gap-4">


                            <div className="hidden lg:block basis-1/4 h-full bg-white rounded-xl shadow-lg">
                                <Sidebar />
                            </div>



                            <div className="flex-1 lg:basis-3/4 bg-green-100">
                                {/* Columna 2 (80%) */}
                                {children}
                                <FooterInfo />
                            </div>

                        </div>

                    </div>


                    <WhatsAppButton />

                </main>




            </div>
        </>
    );
};
