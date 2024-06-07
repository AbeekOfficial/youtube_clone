import React from "react";
import { formatDate } from "../../utils/date";

type DateDisplayProps = {
  date: string;
  className?: string;
};

const DateDisplay: React.FC<DateDisplayProps> = ({ date, className }) => {
  return <span className={className}>{formatDate(date)}</span>;
};

export default DateDisplay;
