import React, { useEffect, useState } from 'react';
import { DeleteIcon, Eye } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { getStressHistory, deleteHistory } from '../../config/api';
import { useQueryClient, useQuery, useMutation } from '@tanstack/react-query';

const StressHistory = () => {

  const queryClient = useQueryClient();

  // const [history, setHistory] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);  // tracks which page user is on
  const [entriesPerPage] = useState(5);
  const [selectedEntry, setSelectedEntry] = useState(null);   // stores the entry user clicked "view" on

  useEffect(() => {
    const fetchHistory = async () => {
      // try {
      //   const {data} = await axios.get('/api/stress');
      //   if (data.success) {
      //     setHistory(data.data || []);
      //   } else {
      //     toast.error('Failed to fetch history');
      //   }
      // } catch (err) {
      //   console.error(err);
      //   toast.error('Error fetching data');
      // }
    };
    fetchHistory();
  }, []);

  const {data: history = [], isLoading: historyLoading, error: historyError} = useQuery({  

    queryKey: ["history"],
    queryFn: getStressHistory,
    onError: (error) => {
      toast.error("Failed to load stress history!")
    }
  });

  const {
    mutate: deleteHistoryMutation,
    isPending: deleteLoading,
  } = useMutation({
    mutationFn: deleteHistory,
    onSuccess: () => {
      toast.success("Stress Assessment deleted");
      if (selectedEntry && selectedEntry._id === entry._id) {
        setSelectedEntry(null);
      }
      queryClient.invalidateQueries({ queryKey: ["history"] });
    },
  });

  const deleteAssessment = async (entry) => {
    const confirmed = window.confirm('Are you sure you want to delete this entry?');

    if (!confirmed) return;

    deleteHistoryMutation(entry._id);
  };


  const paginatedData = history.slice(
    (currentPage - 1) * entriesPerPage,
    currentPage * entriesPerPage
  );

  const totalPages = Math.ceil(history.length / entriesPerPage);

  const formatDate = (dateStr) => new Date(dateStr).toLocaleDateString();

  return (
    <div className="space-y-6">
      <div className="rounded-2xl p-6 shadow-lg border bg-white border-gray-100">
        <h2 className="text-2xl font-bold mb-4 text-gray-900">Stress History</h2>

        {paginatedData.length === 0 ? (
          <p className="text-gray-500 italic">No stress data available.</p>
        ) : (
          <div className="space-y-4">
            {paginatedData.map((entry, idx) => (
              <div key={idx} className="rounded-lg border p-4 flex justify-between items-center border-gray-200 text-gray-800">
                <div>
                  <p className="font-semibold">Date: {formatDate(entry.createdAt)}</p>
                  <p className="text-sm text-gray-500">Stress Level: {entry.stressLevel}/5</p>
                </div>
                <div className="flex items-center gap-5">
                  <button
                  onClick={() => setSelectedEntry(entry)}
                  className="p-2 rounded-full bg-orange-200 text-black hover:bg-orange-300 border-orange-400"
                  title="View details"
                >
                  <Eye className="w-4 h-4" />
                </button>
                <button
                  onClick={() => deleteAssessment(entry)}
                  className="p-2 rounded-full bg-red-300 text-black hover:bg-red-400 border-red-400"
                  title="View details"
                  disabled={deleteLoading}
                >
                  <DeleteIcon className="w-4 h-4" />
                </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="mt-6 flex justify-center space-x-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 bg-gray-200  rounded hover:bg-gray-300 disabled:opacity-50"
            >
              Prev
            </button>
            <span className="px-3 py-1 text-gray-700">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 bg-gray-200  rounded hover:bg-gray-300 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </div>

      {/* Popup Modal */}
     {selectedEntry && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center px-4 py-6">
          <div className="w-full max-w-2xl p-6 rounded-xl shadow-2xl border overflow-y-auto max-h-[90vh] bg-white border-gray-200 text-gray-800">
            <h3 className="text-2xl font-bold mb-4">Stress Details</h3>

            <div className="space-y-4 text-sm sm:text-base">
              <p><span className="font-semibold">Date:</span> {formatDate(selectedEntry.createdAt)}</p>
              <p><span className="font-semibold">Stress Level:</span> {selectedEntry.stressLevel}/5</p>

              {/* Stress Factors */}
              <div>
                <p className="font-semibold mb-1">Stress Factors:</p>
                {selectedEntry.stressFactors.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {selectedEntry.stressFactors.map((f, i) => (
                      <span
                        key={i}
                        className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-medium shadow-sm"
                      >
                        {f}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-400 italic">None</p>
                )}
        </div>

        {/* Symptoms */}
        <div>
          <p className="font-semibold mb-1">Symptoms:</p>
          {selectedEntry.symptoms.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {selectedEntry.symptoms.map((s, i) => (
                <span
                  key={i}
                  className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium shadow-sm"
                >
                  {s}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-gray-400 italic">None</p>
          )}
        </div>

        {/* Coping Strategies */}
        <div>
          <p className="font-semibold mb-1">Coping Strategies:</p>
          {selectedEntry.copingStrategies.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {selectedEntry.copingStrategies.map((c, i) => (
                <span
                  key={i}
                  className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-medium shadow-sm"
                >
                  {c}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-gray-400 italic">None</p>
          )}
        </div>

        {/* Notes */}
        <div>
          <p className="font-semibold mb-1">Notes:</p>
          <p className="whitespace-pre-wrap">{selectedEntry.notes || <span className="italic text-gray-400">None</span>}</p>
        </div>
      </div>

      <div className="mt-6 text-right">
        <button
          onClick={() => setSelectedEntry(null)}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Close
        </button>
      </div>
    </div>
  </div>
)}
    </div>
  );
};

export default StressHistory;