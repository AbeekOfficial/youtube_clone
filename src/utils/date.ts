import { format } from "date-fns";

export const formatDate = (dateString: string): string => {
  const parsedDate = new Date(dateString);
  return format(parsedDate, "dd MMM yyyy");
};
