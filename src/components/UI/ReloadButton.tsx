import { FaSync } from "react-icons/fa";

const ReloadButton = () => {
  const handleReload = () => {
    window.location.reload();
  };

  return (
    <button
      onClick={handleReload}
      className="bg-white rounded-lg p-3 shadow-md cursor-pointer"
    >
      <FaSync className="text-gray-600 text-lg" />
    </button>
  );
};

export default ReloadButton;
