import { formatNumber } from "../../utils/number-formatter";

type NumberDisplayProps = {
  value: number;
  className?: string;
  children: React.ReactNode;
};

const NumberDisplay: React.FC<NumberDisplayProps> = ({
  value,
  className,
  children,
}) => {
  return (
    <span className={className}>
      {formatNumber(value)} {children}
    </span>
  );
};

export default NumberDisplay;
