const CreateServiceCard = ({ onCreateService }) => {
  return (
    <div className="bg-white p-8 sm:p-12 rounded-2xl w-full max-w-xl border border-gray-100">
      <button
        onClick={onCreateService}
        className="bg-[#28A844] text-white px-5 py-2 rounded"
      >
        Create Service
      </button>
    </div>
  );
};

export default CreateServiceCard;
