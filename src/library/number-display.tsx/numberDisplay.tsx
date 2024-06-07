import { formatNumber } from "../../utils/number-formatter";

type NumberDisplayProps = {
  value: number;
  className?: string;
};

const NumberDisplay: React.FC<NumberDisplayProps> = ({ value, className }) => {
  return <span className={className}>{formatNumber(value)}</span>;
};

export default NumberDisplay;
