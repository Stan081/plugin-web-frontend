import { TICKETS } from "@/lib/constants";
import axios, { AxiosResponse } from "axios";

type CheckoutResponse = {
  status: number;
  message: string;
  data?: any;
};

export const Checkout = async (data: any): Promise<CheckoutResponse> => {
  try {
    const response: AxiosResponse<CheckoutResponse> = await axios.post(
      TICKETS,
      data,
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message);
  }
};
