import { Label } from "@/components/ui/label";
import React, { useState } from "react";
import { PiInfoBold } from "react-icons/pi";

const InviteeInfo = () => {
  // Form state
  const [inviteMessage, setInviteMessage] = useState("");
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [ticketPasscode, setTicketPasscode] = useState("");

  // Function to generate passcode
  const generatePasscode = () => {
    const passcode = Math.random().toString(36).substring(2, 10).toUpperCase();
    setTicketPasscode(passcode);
  };

  return (
    <div className="overflow-hidden">
      <form className="text-white">
        {/* Invite Message */}
        <div className="mb-4">
          <Label className="block text-sm mb-2">Invite message</Label>
          <textarea
            className="w-full p-2 border border-gray-300 rounded-lg bg-transparent text-sm text-gray-400"
            placeholder="Enter a brief message you want your invitees to see"
            maxLength={30}
            value={inviteMessage}
            onChange={(e) => setInviteMessage(e.target.value)}
          />
          <small className="block text-right text-xs text-gray-400">
            30 char max
          </small>

          {/* <div className="mt-2 bg-[#F4E1C4] text-[#3D2E21] p-2 rounded text-sm">
            <span>
              <PiInfoBold size={16} />
            </span>
            This message would be sent to invitees added to this event.
            <p></p>
          </div> */}
        </div>

        {/* Full Name */}
        <div className="mb-4">
          <label className="block text-sm mb-2">Full Name *</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded-lg bg-transparent text-sm"
            placeholder="Enter full name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
        </div>

        {/* Phone Number */}
        <div className="mb-4">
          <label className="block text-sm mb-2">Phone number</label>
          <div className="flex space-x-2">
            <select className="p-2 border border-gray-300 rounded-lg bg-transparent text-sm">
              <option value="33">🇫🇷 +33</option>
              {/* Add more options as needed */}
            </select>
            <input
              type="tel"
              className="w-full p-2 border border-gray-300 rounded-lg bg-transparent text-sm"
              placeholder="---- ---- ----"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
        </div>

        {/* Ticket Passcode */}
        <div className="mb-4">
          <label className="block text-sm mb-2">Ticket pass code</label>
          <div className="flex space-x-2">
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-lg bg-transparent text-sm"
              placeholder="---- ---- ----"
              value={ticketPasscode}
              onChange={(e) => setTicketPasscode(e.target.value)}
            />
            <button
              type="button"
              className="text-red-600 font-bold text-sm"
              onClick={generatePasscode}
            >
              Generate passcode
            </button>
          </div>
        </div>

        {/* Form Buttons */}
        <div className="flex justify-between mt-6">
          <button
            type="button"
            className="px-6 py-2 bg-transparent border border-white text-white rounded-lg hover:bg-gray-700"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-[#AF4C4C] text-white rounded-lg hover:bg-[#922D2D]"
            disabled={!fullName}
          >
            Add I
          </button>
        </div>
      </form>
    </div>
  );
};

export default InviteeInfo;
