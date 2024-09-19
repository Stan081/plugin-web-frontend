import { StepsProps } from '@/pages/create-event';
import React, { FC } from 'react'

interface FreeTicketFormProps extends StepsProps {
    selectTicket: string;
  }

const FreeTicketForm: FC<FreeTicketFormProps> = () => {
  return (
    <div>FreeTicketForm</div>
  )
}

export default FreeTicketForm