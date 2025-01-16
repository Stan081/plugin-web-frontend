import React from "react"
import { HiOutlineTicket } from "react-icons/hi";

const OrganiserTableTicketLabel = ({text} : {text: string}) => {
    return (
        <div className="inline-flex items-end gap-3">
        <div className="size-5 flex items-center justify-center">
          <HiOutlineTicket size="20" color="#2C2B2E" />
        </div>
        <p>{text}</p>
      </div>
    )
}

export default OrganiserTableTicketLabel;




