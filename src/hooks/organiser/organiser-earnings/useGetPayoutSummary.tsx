import { WITHDRAWAL_SUMMARY } from "@/lib/constants";
import { getToken } from "@/lib/token";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export interface PayoutSummary {
  /** Naira. Everything the organiser can withdraw right now. */
  availableBalance: number;
  /** The amount a withdrawal would be for — always the full available balance. */
  withdrawableAmount: number;
  canRequest: boolean;
  /** Why a withdrawal can't be requested, when `canRequest` is false. */
  blockedReason: string | null;
  hasPayoutAccount: boolean;
  openRequest: {
    _id: string;
    amount: number;
    status: "initiated" | "pending";
  } | null;
  totalPaid: number;
  totalPending: number;
}

/**
 * The single source of truth for whether the Withdraw button should do anything.
 *
 * The server decides — the UI only reports its answer. Duplicating the "can they
 * withdraw?" rules in the client would just create a second place for them to be
 * wrong, and the server re-checks on every request regardless.
 */
export const useGetPayoutSummary = () => {
  const token = getToken();

  return useQuery<{ data: PayoutSummary }>({
    queryKey: ["payoutSummary"],
    queryFn: () =>
      axios
        .get(WITHDRAWAL_SUMMARY, {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => res?.data)
        .catch((err) => {
          throw new Error(err?.response?.data?.message || err.message);
        }),
    retry: false,
  });
};
