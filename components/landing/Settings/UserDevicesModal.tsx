"use client";

import { useGetUserDevicesQuery } from "@/redux/features/api/user/settings/userDevices";
import { X, Monitor, Smartphone } from "lucide-react";

type Props = {
  onClose: () => void;
};

const DeviceModal = ({ onClose }: Props) => {
  const { data, isLoading, isError } = useGetUserDevicesQuery();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-3">
      {/* Modal box */}
      <div className=" max-w-md bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center px-4 md:px-8 py-3 md:py-6 border-b !border-[#229ECF]">
          <h2 className="text-lg font-semibold">Logged-in Devices</h2>
          <button onClick={onClose}>
            <X className="w-5 h-5 cursor-pointer hover:text-red-500" />
          </button>
        </div>

        {/* Content */}
        <div className=" h-72 md:h-96 overflow-y-auto px-4 md:px-8 py-3 md:py-6 space-y-3">
          {isLoading && <p className="text-sm">Loading devices...</p>}
          {isError && (
            <p className="text-sm text-red-500">Failed to load devices</p>
          )}

          {data?.data.map((device) => (
            <div
              key={device.id}
              className="flex justify-between bg-white/30 items-start border-2 !border-white rounded-lg p-3"
            >
              <div className="flex gap-3">
                {device.device_name.toLowerCase().includes("android") ? (
                  <Smartphone className="w-5 h-5 text-gray-500 mt-1" />
                ) : (
                  <Monitor className="w-5 h-5 text-gray-500 mt-1" />
                )}

                <div>
                  <p className="text-sm font-medium">{device.device_name}</p>
                  <p className="text-xs text-gray-500">
                    Last active: {device.last_active_at}
                  </p>
                </div>
              </div>

              {device.is_active === 1 && (
                <span className="text-xs font-semibold text-green-600">
                  Active
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Footer */}
        {/* <div className="px-4 py-3 border-t flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm rounded-lg border hover:bg-gray-100"
          >
            Close
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default DeviceModal;
