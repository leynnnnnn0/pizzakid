import ModuleHeading from "@/components/module-heading";
import AppLayout from "@/layouts/app-layout";
import { Head, router } from "@inertiajs/react";
import { useState } from "react";
import axios from "axios";

interface StampCode {
  code: string;
  qr_url: string;
  created_at: string;
}

interface Props {
    code : {
        success: boolean;
        code: string;
        qr_url: string;
        created_at: string;
    }
}

export default function Index({code} : Props) {
  const [loading, setLoading] = useState(false);
  const [stampCode, setStampCode] = useState<StampCode | null>(null);
  const [error, setError] = useState<string | null>(null);


  const generateCode = async () => {

  };

  const generateNewCode = () => {
        setLoading(true);
    setError(null);

    router.get('/business/issue-stamp');
    console.log('Code generation requested');
    setLoading(false);
  };

  return (
    <AppLayout>
      <Head title="Issue Stamp" />
      <div className="max-w-2xl mx-auto mt-8">
        {!code.success ? (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <div className="mb-6">
              <svg
                className="w-20 h-20 mx-auto text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </div>

            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Ready to Issue a Stamp?
            </h3>
            <p className="text-gray-600 mb-6">
              Click the button below to generate a unique code for your
              customer.
            </p>

            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md text-red-600 text-sm">
                {error}
              </div>
            )}

            <button
              onClick={generateCode}
              disabled={loading}
              className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? "Generating..." : "Generate Code"}
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow p-8">
            <div className="text-center mb-6">
              <div className="inline-block p-2 bg-green-100 rounded-full mb-4">
                <svg
                  className="w-8 h-8 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-1">
                Code Generated Successfully
              </h3>
              <p className="text-sm text-gray-500">
                Generated on {code.created_at}
              </p>
            </div>

            <div className="border-t border-b border-gray-200 py-6 mb-6">
              <div className="flex justify-center mb-6">
                <img
                  src={code.qr_url}
                  alt="QR Code"
                  className="w-64 h-64 border-2 border-gray-200 rounded-lg"
                />
              </div>

              <div className="text-center">
                <p className="text-sm text-gray-600 mb-2">
                  Or enter code manually:
                </p>
                <div className="inline-block bg-gray-100 px-6 py-3 rounded-lg">
                  <p className="text-3xl font-mono font-bold text-gray-900 tracking-wider">
                    {code.code}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
              <div className="flex items-start">
                <svg
                  className="w-5 h-5 text-yellow-600 mt-0.5 mr-3 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
                <div>
                  <p className="text-sm font-medium text-yellow-800">
                    Important
                  </p>
                  <p className="text-sm text-yellow-700 mt-1">
                    This code will expire in 15 minutes if not used. Customer
                    must scan or enter the code in their app.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={generateNewCode}
                className="flex-1 px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
              >
                Generate New Code
              </button>
            </div>
          </div>
        )}

        <div className="mt-6 text-center text-sm text-gray-500">
          <p>
            Customer should open their app and scan the QR code or enter the
            code manually.
          </p>
        </div>
      </div>
    </AppLayout>
  );
}