import { Link } from "react-router";





const PrimaryButton = ({ text, className, route, path }: { text: string, className?: string, route?: boolean, path?: string }) => {
  return (
    route ? <Link to={path || ""} className={"bg-[#f97316] text-white    font-bold" + " " + className}>
      {text}
    </Link>
      : <button className={"bg-[#f97316] text-white py-2 rounded-xl font-bold" + " " + className}>
        {text}
      </button>
  );
};

export default PrimaryButton;