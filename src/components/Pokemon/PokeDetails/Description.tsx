interface DescriptionProps {
  description: string;
}

const Description = ({ description }: DescriptionProps) => {
  return (
    <div className="text-center pt-4">
      <span className="font-bold">Description</span>
      <p className="text-gray-500 text-m text-justify">
        {description || "No description available"}
      </p>
    </div>
  );
};

export default Description;
