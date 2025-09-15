import dynamic from "next/dynamic";

const PropertyPage = dynamic(() => import("./PropertyDetails"), { ssr: true });

const PropertyDetailsHOC = () => {
	return <PropertyPage />;
};

export default PropertyDetailsHOC;
