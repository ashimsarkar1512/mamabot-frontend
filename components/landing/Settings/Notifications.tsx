"use client";

import { useEffect, useState } from "react";
import { BellOffIcon } from "lucide-react";

import {
  NotificationSettingsPayload,
  useCreateNotificationSettingsMutation,
  useGetNotificationSettingsQuery,
} from "@/redux/features/api/user/settings/notificationSetting";
type Props = {
  activeTab: string;
};
const Notifications = ({ activeTab }: Props) => {
  const { data, isLoading, error } = useGetNotificationSettingsQuery();
  const [createNotificationSettings] = useCreateNotificationSettingsMutation();

  /* ======================
     Toggle state (ONE source of truth)
  ====================== */
  const [toggles, setToggles] = useState<Record<string, boolean>>({
    health_wellness: false,
    baby_movement_recovery: false,
    community: false,
    recommendation: false,
    mindful_moments: false,
    announcements: false,
  });

  /* ======================
     GET → State sync
  ====================== */
  useEffect(() => {
    if (data?.data) {
      setToggles({
        health_wellness: Boolean(data.data.health_wellness),
        baby_movement_recovery: Boolean(data.data.baby_movement_recovery),
        community: Boolean(data.data.community),
        recommendation: Boolean(data.data.recommendation),
        mindful_moments: Boolean(data.data.mindful_moments),
        announcements: Boolean(data.data.announcements),
      });
    }
  }, [data]);

  const toggleSetting = async (key: keyof NotificationSettingsPayload) => {
    const updatedToggles = {
      ...toggles,
      [key]: !toggles[key],
    };

    setToggles(updatedToggles);

    const payload: NotificationSettingsPayload = {
      health_wellness: updatedToggles.health_wellness ? 1 : 0,
      baby_movement_recovery: updatedToggles.baby_movement_recovery ? 1 : 0,
      community: updatedToggles.community ? 1 : 0,
      recommendation: updatedToggles.recommendation ? 1 : 0,
      mindful_moments: updatedToggles.mindful_moments ? 1 : 0,
      announcements: updatedToggles.announcements ? 1 : 0,
    };

    try {
      await createNotificationSettings(payload).unwrap();
      console.log("✅ Auto-saved");
    } catch (err) {
      console.error("❌ Auto-save failed", err);
    }
  };

  const turnOffAll = async () => {
    const offPayload: NotificationSettingsPayload = {
      health_wellness: 0,
      baby_movement_recovery: 0,
      community: 0,
      recommendation: 0,
      mindful_moments: 0,
      announcements: 0,
    };

    setToggles({
      health_wellness: false,
      baby_movement_recovery: false,
      community: false,
      recommendation: false,
      mindful_moments: false,
      announcements: false,
    });

    await createNotificationSettings(offPayload);
  };

  if (isLoading) return <p>Loading notifications...</p>;
  if (error) return <p>Failed to load notifications</p>;

  return (
    <div className=" ">
      <div className="bg-white/25 border-2  rounded-2xl !border-white mb-8 md:mb-16">
        {/* Header */}
        <div className=" bg-[#DEF0F8] p-6  rounded-2xl">
          <h1 className="text-xl sm:text-2xl font-semibold text-gray-800 ">
            Notifications & Alerts
          </h1>
          <p className="text-sm text-gray-500">
            Choose which reminders, updates, and emails you'd like to receive.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
          {(Object.keys(toggles) as (keyof NotificationSettingsPayload)[]).map(
            (key) => (
              <div
                key={key}
                className="flex justify-between px-3 md:px-6 py-5 md:py-10"
              >
                <span className="capitalize">{key.replaceAll("_", " ")}</span>

                <label className="relative inline-flex cursor-pointer">
                  <input
                    type="checkbox"
                    checked={toggles[key]}
                    onChange={() => toggleSetting(key)}
                    className="sr-only peer"
                  />
                  <div
                    className="w-11 h-6 bg-gray-400 rounded-full peer-checked:bg-primary
              after:content-[''] after:absolute after:top-[2px] after:left-[2px]
              after:bg-white after:rounded-full after:h-5 after:w-5
              after:transition-all peer-checked:after:translate-x-full"
                  />
                </label>
              </div>
            ),
          )}
        </div>
      </div>
      <div className="flex justify-center">
        <button
          onClick={turnOffAll}
          className="bg-white flex justify-center text-sm md:text-lg items-center gap-2 text-[#229ECF] border-2 border-[#229ECF] px-2 md:px-8 py-2 md:py-4 rounded-lg hover:bg-[#229ECF] hover:text-white cursor-pointer transition-colors"
        >
          <BellOffIcon className="w-5 h-5" />
          <span>Turn Off All Notifications</span>
        </button>
      </div>
    </div>
  );
};

export default Notifications;
