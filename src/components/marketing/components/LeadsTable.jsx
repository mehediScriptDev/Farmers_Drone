import { FaRegClock } from "react-icons/fa";

const LeadsTable = ({ data = [], statusStyles = {}, onOpenClock }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-max">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            <th className="px-3 md:px-6 py-3 text-left text-xs md:text-lg font-medium text-black whitespace-nowrap">
              Lead
            </th>
            <th className="px-3 md:px-6 py-3 text-left text-xs md:text-lg font-medium text-black whitespace-nowrap">
              Contact
            </th>
            <th className="px-3 md:px-6 py-3 text-left text-xs md:text-lg font-medium text-black whitespace-nowrap">
              Source
            </th>
            <th className="px-3 md:px-6 py-3 text-left text-xs md:text-lg font-medium text-black whitespace-nowrap">
              Location
            </th>
            <th className="px-3 md:px-6 py-3 text-left text-xs md:text-lg font-medium text-black whitespace-nowrap">
              Score
            </th>
            <th className="px-3 md:px-6 py-3 text-left text-xs md:text-lg font-medium text-black whitespace-nowrap">
              Status
            </th>
            <th className="px-3 md:px-6 py-3 text-left text-xs md:text-lg font-medium text-black whitespace-nowrap">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {data.map((activity) => (
            <tr key={activity.id} className="hover:bg-gray-50">
              <td className="py-3 px-4 text-xs md:text-lg">{activity.lead}</td>
              <td className="py-3 px-4 whitespace-pre-line text-xs md:text-lg">
                {activity.contact}
              </td>
              <td className="py-3 px-4 text-xs md:text-lg">
                {activity.source}
              </td>
              <td className="py-3 px-4 text-xs md:text-lg">
                {activity.location}
              </td>
              <td
                className={`py-3 px-4 text-xs md:text-lg font-semibold ${
                  activity.status === "Hot"
                    ? "text-red-600"
                    : activity.status === "Warm"
                    ? "text-yellow-600"
                    : "text-green-600"
                }`}
              >
                <span className="ml-4">{activity.score}</span>
              </td>
              <td className="py-3 px-4 text-xs md:text-lg">
                <span
                  className={`inline-block px-3 py-1 rounded-full text-xs md:ml-3 font-semibold ${
                    statusStyles[activity.status]
                  }`}
                >
                  {activity.status}
                </span>
              </td>
              <td className="py-3 px-4 text-xs md:text-lg">
                <button
                  className="rounded-full p-1 text-green-200 transition md:ml-4"
                  onClick={onOpenClock}
                >
                  <FaRegClock />
                </button>
              </td>
            </tr>
          ))}

          {data.length === 0 && (
            <tr>
              <td colSpan="7" className="text-center py-4 text-gray-500">
                No activities in this period
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default LeadsTable;
