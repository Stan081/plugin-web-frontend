"use client";
import {
  PaidSeatSection,
  PaidSeatSectionFormSchema,
} from "@/models/create-event-schema";
import {
  seatedTypes,
  useCreateEventContext,
} from "@/providers/create_event.provider";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { FC, useCallback, useEffect, useMemo, useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  SeatSectionLists,
  SeatSectionListsType,
} from "@/static-datas/create-event";
import { IoReturnDownBackOutline } from "react-icons/io5";


const EditFreeSeatDetail = () => {
  return (
    <div>EditFreeSeatDetail</div>
  )
}

export default EditFreeSeatDetail