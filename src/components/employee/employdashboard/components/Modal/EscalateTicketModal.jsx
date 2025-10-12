import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const escalationLevels = ["High", "Medium", "Low"];
const escalationReasons = [
  "Customer Unhappy",
  "Delayed Response",
  "Technical Escalation",
  "Other",
];

// ✅ Reusable Dropdown Component
const Dropdown = ({ label, options, selected, setSelected }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative w-full">
      <label className="text-sm font-medium text-gray-700 block mb-1">
        {label}
      </label>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={`w-full flex justify-between items-center border border-gray-300 rounded-md px-3 py-2 text-sm bg-white 
        transition-all duration-200 focus:ring-2 focus:ring-green-500 focus:outline-none hover:border-green-400`}
      >
        <span className={`${selected ? "text-gray-800" : "text-gray-400"}`}>
          {selected || `Select ${label}`}
        </span>
        <ChevronDown
          size={18}
          className={`text-gray-500 transform transition-transform duration-200 ${
            open ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      <div
        className={`absolute left-0 right-0 mt-2 bg-white shadow-lg rounded-md overflow-hidden z-50 border border-gray-200 transform transition-all duration-200 origin-top ${
          open ? "scale-100 opacity-100" : "scale-95 opacity-0 pointer-events-none"
        }`}
      >
        {options.map((option) => (
          <div
            key={option}
            onClick={() => {
              setSelected(option);
              setOpen(false);
            }}
            className={`px-3 py-2 cursor-pointer text-sm hover:bg-green-100 transition ${
              selected === option ? "bg-green-50 font-medium" : ""
            }`}
          >
            {option}
          </div>
        ))}
      </div>
    </div>
  );
};

const EscalateTicketModal = ({ isOpen, onClose }) => {
  const [selectedLevel, setSelectedLevel] = useState("");
  const [selectedReason, setSelectedReason] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [comments, setComments] = useState("");
  const [ticketId, setTicketId] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page reload

    // Validation
    if (!ticketId || !selectedLevel || !selectedReason || !assignedTo) {
      toast.error("Please fill all required fields!");
      return;
    }

    // Show success toast
    toast.success("Ticket escalated successfully!");

    // Close modal after short delay
    setTimeout(() => {
      onClose();
      // Clear form
      setTicketId("");
      setSelectedLevel("");
      setSelectedReason("");
      setAssignedTo("");
      setComments("");
    }, 1000);
  };

  return (
    <>
      <ToastContainer position="top-center" />
      <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 px-2">
        <div className="bg-white rounded-lg shadow-lg w-full max-w-lg">
          {/* Header */}
          <div className="flex justify-between items-center px-4 py-3 border-b border-gray-200">
            <h2 className="text-lg font-semibold">Escalate Ticket</h2>
            <button
              onClick={onClose}
              className="text-gray-500 text-xl hover:text-gray-800"
            >
              ✕
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="px-4 pt-4 pb-4 space-y-3">
            {/* Ticket ID */}
            <div className="flex flex-col space-y-1">
              <label className="text-sm font-medium text-gray-700">
                Ticket ID <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Enter Ticket ID"
                value={ticketId}
                onChange={(e) => setTicketId(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-green-500 focus:border-green-400"
              />
            </div>

            {/* Escalation Level */}
            <Dropdown
              label="Escalation Level"
              options={escalationLevels}
              selected={selectedLevel}
              setSelected={setSelectedLevel}
            />

            {/* Escalation Reason */}
            <Dropdown
              label="Escalation Reason"
              options={escalationReasons}
              selected={selectedReason}
              setSelected={setSelectedReason}
            />

            {/* Assign To */}
            <div className="flex flex-col space-y-1">
              <label className="text-sm font-medium text-gray-700">
                Assign To <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Enter the name or team to assign"
                value={assignedTo}
                onChange={(e) => setAssignedTo(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-green-500 focus:border-green-400"
              />
            </div>

            {/* Comments */}
            <div className="flex flex-col space-y-1">
              <label className="text-sm font-medium text-gray-700">
                Additional Comments
              </label>
              <textarea
                placeholder="Add any additional details..."
                rows="4"
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm outline-none resize-none focus:ring-2 focus:ring-green-500 focus:border-green-400"
              ></textarea>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white font-medium rounded-md py-2 transition"
            >
              Escalate Ticket
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default EscalateTicketModal;
