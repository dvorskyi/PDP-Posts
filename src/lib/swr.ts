import { appAPI } from "@/api/axios";

export const fetcher = <T>(url: string) => appAPI.get<T>(url).then((res) => res.data);