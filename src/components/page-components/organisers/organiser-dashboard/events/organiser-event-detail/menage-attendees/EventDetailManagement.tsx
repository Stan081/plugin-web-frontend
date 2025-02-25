import React, { useState } from "react";
import AttendeeList from "./attendee/AttendeeList";
import CheckInSummary from "./check-in-summary/CheckInSummary";
import ReminderEmails from "./reminder-emails/ReminderEmails";
import EventTickets from "./event-tickets";

const tabLink = [
  { title: "Tickets", key: "tickets" },
  { title: "Attendee list", key: "attendee" },
  { title: "Check-in summary", key: "summary" },
  // { title: "Reminder Emails", key: "reminder_emails" },
];

const EventDetailManagement = () => {
  const [activeTab, setActiveTab] = useState<string>("tickets");
  return (
    <div>
      <h2 className="font-pally-medium text-xl">Manage tickets</h2>

      <ul className="mt-3 flex justify-start overflow-x-auto whitespace-nowrap pb-2 items-center gap-4 align-baseline">
        {tabLink.map((tab) => (
          <li key={tab.key} role="presentation">
            <button
              className={`font-pally-regular text-sm whitespace-nowrap py-2 px-3 ${
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
        className="mt-3"
      >
        {activeTab === "tickets" && <EventTickets />}
        {activeTab === "attendee" && <AttendeeList />}
        {activeTab === "summary" && <CheckInSummary />}
        {/* {activeTab === "reminder_emails" && <ReminderEmails />} */}
      </div>
    </div>
  );
};

export default EventDetailManagement;
