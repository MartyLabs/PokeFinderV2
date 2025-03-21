interface DescriptionProps {
  description: string;
}

const Description = ({ description }: DescriptionProps) => {
  return (
    <div data-testid="description-section" className="text-center pt-4">
      <span className="font-bold">Description</span>
      <p
        data-testid="description-text"
        className="text-gray-500 text-m text-justify"
      >
        {description || "No description available"}
      </p>
    </div>
  );
};

export default Description;
