import { WITHDRAWAL } from "@/lib/constants";
import { getToken } from "@/lib/token";
import axios, { AxiosResponse } from "axios";

type WithdrawalResponse = {
  status: number;
  message: string;
  data?: any;
};

/**
 * Starts a withdrawal of the organiser's full available balance.
 *
 * Deliberately sends no amount: the server derives it from the ledger. A client
 * that could name its own figure would be a client that could name the wrong one.
 */
export const InitiateWithdrawal = async (): Promise<WithdrawalResponse> => {
  const token = getToken();

  try {
    const response: AxiosResponse<WithdrawalResponse> = await axios.post(
      WITHDRAWAL,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error: any) {
    // The API explains *why* it refused ("you already have a withdrawal in
    // progress", "add a bank account first"). Dropping that message leaves the
    // organiser staring at a generic failure with no idea what to do about it.
    throw new Error(
      error?.response?.data?.message ||
        error?.message ||
        "Could not start your withdrawal. Please try again."
    );
  }
};
