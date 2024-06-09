import ReactPlayer from "react-player";

export default function Player({
  url,
  className,
  {...props}
}: {
  url: string;
  className: string;
}) {
  return (
    <div className={`relative ${className}`}>
      <ReactPlayer clasName="absolute top-0 left-0 w-full h-full" url={url} {...props}/>
    </div>
  );
}
