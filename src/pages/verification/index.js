import { useState } from "react";
import Layout from "../../components/layout/dashboard";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";
import useSWR from "swr";
import { useSession } from "next-auth/react";

const Verification = dynamic(() => import("../verification/verification"), { ssr: false });

const fetcher = async (url, token) => {
    const response = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` },
    });
    if (!response.ok) throw new Error(`Error: ${response.status}`);
    return response.json();
};

const SocialsPage = () => {
    const { data: session } = useSession();
    const [accepted, setAccepted] = useState(false);

    const { data, mutate } = useSWR(
        session?.jwt
            ? [`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/me?populate[challenges][populate]=broker_account`, session.jwt]
            : null,
        ([url, token]) => fetcher(url, token)
    );

    console.log("User Data:", data);

    const isVerified = data?.isVerified;
    const hasPhase3Challenge = data?.challenges?.filter(challenge => challenge.phase == "3") || [];
    const isConfirmed = data?.confirmed;

    console.log("Is Verified:", isVerified);
    console.log("Has Phase 3 Challenge:", hasPhase3Challenge);
    console.log("Is Confirmed:", isConfirmed);

    const handleSign = async () => {
        if (accepted) {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/${data?.id}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${session.jwt}`,
                    },
                    body: JSON.stringify({ confirmed: true }),
                });

                if (!response.ok) throw new Error("Error al actualizar la confirmación");

                alert("Contrato firmado exitosamente.");
                mutate(); // Actualizar los datos en SWR
            } catch (error) {
                console.error("Error al firmar el contrato:", error);
                alert("Hubo un problema al firmar el contrato.");
            }
        }
    };

    if (hasPhase3Challenge && !isVerified) {
        return (
            <Layout>
                <div className="p-6 dark:bg-zinc-800 bg-white shadow-md rounded-lg dark:text-white dark:border-zinc-700 dark:shadow-black">
                    <h2 className="text-xl font-semibold mb-0 flex items-center">
                        <CheckCircleIcon className="h-6 w-6 mr-2" />
                        Sección bloqueada
                    </h2>
                    <p className="text-sm mt-2 text-gray-600 dark:text-gray-400">
                        Para acceder a esta sección, necesitas haber alcanzado la fase NeoTrader en tu desafío. Esta etapa representa un nivel avanzado en tu camino y desbloquea todas las herramientas y beneficios exclusivos. Sigue avanzando para aprovechar todo lo que tenemos preparado para ti.
                    </p>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="p-6 dark:bg-zinc-800 bg-white shadow-md rounded-lg dark:text-white dark:border-zinc-700 dark:shadow-black">
                <h2 className="text-xl font-semibold mb-0 flex items-center">
                    <CheckCircleIcon className="h-6 w-6 mr-2" />
                    Verificación
                </h2>
            </div>

            <Verification apiKey="dd8f7e39-0ef2-4c05-a872-b40235b2d24f" />

            {(
                <div className="mt-6">
                    <p className="text-lg font-semibold mb-4 text-zinc-900 dark:text-white">
                        2. Firma de contrato
                    </p>
                    <div className="flex flex-col p-6 dark:bg-black bg-white shadow-md rounded-lg dark:text-white dark:border-zinc-700 dark:shadow-black">
                        <div className="h-64 overflow-y-auto border p-4 rounded-lg bg-gray-100 dark:bg-zinc-900">
                            <p className="text-sm text-zinc-900 dark:text-white whitespace-pre-line">
                                1. Términos
                                Al acceder al sitio web de Wazend, aceptas estar sujeto a estos términos de servicio...
                                2. Licencia de Uso
                                Se concede permiso para descargar temporalmente una copia de los materiales...
                                3. Descargo de responsabilidad
                                Los materiales en el sitio web de Wazend se proporcionan «tal cual»...
                                4. Limitaciones
                                En ningún caso Wazend o sus proveedores serán responsables de ningún daño...
                                5. Precisión de los materiales
                                Los materiales que aparecen en el sitio web de Wazend podrían incluir errores...
                                6. Enlaces
                                Wazend no ha revisado todos los sitios vinculados a su sitio web...
                                7. Modificaciones
                                Wazend puede revisar estos términos de servicio para su sitio web...
                                8. Ley Aplicable
                                Estos términos y condiciones se rigen e interpretan de acuerdo con las leyes de Wazend...
                            </p>
                        </div>
                        <label className="flex items-center space-x-2 mt-4">
                            <input
                                type="checkbox"
                                checked={true}
                                onChange={() => {}}
                                className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                            />
                            <span className="text-sm text-zinc-900 dark:text-white">Acepto los términos del contrato</span>
                        </label>
                        <Button
                            className="mt-4 bg-[#1F6263] hover:bg-[#29716c] text-white text-sm font-medium px-6 py-5 rounded-md"
                            disabled={isConfirmed}
                            onClick={handleSign}
                        >
                            Firmar
                        </Button>
                    </div>
                </div>
            )}
        </Layout>
    );
};

export default SocialsPage;
