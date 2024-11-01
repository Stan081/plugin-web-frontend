import React, { useState } from "react";
import AttendeeList from "./attendee/AttendeeList";

const tabLink = [
  { title: "Attendee list", key: "attendee" },
  { title: "Check-in summary", key: "summary" },
  { title: "Reminder Emails", key: "reminder_emails" },
];

const EventDetailManagement = () => {
  const [activeTab, setActiveTab] = useState<string>("attendee");
  return (
    <div>
      <h2 className="font-pally-medium text-xl">Manage attendees</h2>

      <ul className="mt-6 flex justify-start items-center gap-4 align-baseline">
        {tabLink.map((tab) => (
          <li key={tab.key} role="presentation">
            <button
              className={`font-pally-regular py-2 px-3 ${
                activeTab === tab.key
                  ? "border border-[#D9302A] text-[#D9302A] bg-[#f3cac9] rounded-xl"
                  : " text-[#586170]"
              }`}
              role="tab"
              aria-selected={activeTab === tab.key}
              aria-controls={`panel-${tab.key}`}
              id={`tab-${tab.key}`}
              onClick={() => setActiveTab(tab.key)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  setActiveTab(tab.key);
                }
              }}
            >
              {tab.title}
            </button>
          </li>
        ))}
      </ul>

      <div
        id={`panel-${activeTab}`}
        role="tabpanel"
        aria-labelledby={`tab-${activeTab}`}
        className="mt-6 md:mt-10"
      >
        {activeTab === "attendee" && <AttendeeList />}
      </div>
    </div>
  );
};

export default EventDetailManagement;
