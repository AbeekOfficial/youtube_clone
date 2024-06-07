import { useParams } from "react-router-dom";

export default function Channels() {
  const params = useParams();
  console.log(params);
  return <div></div>;
}
