// // src/components/Sleep/SleepHistory.jsx
// import React, { useEffect, useState } from 'react';
// import { apiService } from '../../services/api';
// import { useApp } from '../../contexts/AppContext';
// import SleepForm from '../../components/forms/SleepForm';

// const SleepHistory = () => {
//   const { state, dispatch } = useApp();
//   const [sleepRecords, setSleepRecords] = useState([]);
//   const [editingRecord, setEditingRecord] = useState(null);

//   // Fetch sleep history
//   const fetchHistory = async () => {
//     try {
//       dispatch({ type: 'SET_LOADING', payload: true });
//       const result = await apiService.getSleepHistory();
//       if (result.success) setSleepRecords(result.data);
//     } catch (error) {
//       console.error('Error fetching sleep history:', error);
//     } finally {
//       dispatch({ type: 'SET_LOADING', payload: false });
//     }
//   };

//   useEffect(() => {
//     fetchHistory();
//   }, []);

//   const handleDelete = async (recordId) => {
//     if (!window.confirm('Are you sure you want to delete this sleep record?')) return;

//     try {
//       dispatch({ type: 'SET_LOADING', payload: true });
//       const result = await apiService.deleteSleepRecord(recordId);
//       if (result.success) {
//         setSleepRecords((prev) => prev.filter((rec) => rec._id !== recordId));
//       }
//     } catch (error) {
//       console.error('Error deleting record:', error);
//     } finally {
//       dispatch({ type: 'SET_LOADING', payload: false });
//     }
//   };

//   const handleSaved = () => {
//     // Refresh table and clear editing state
//     fetchHistory();
//     setEditingRecord(null);
//   };

//   return (
//     <div className="max-w-4xl mx-auto mt-8 space-y-6">
//       {/* Sleep Form (Add / Edit) */}
//       <SleepForm editingRecord={editingRecord} onSaved={handleSaved} />

//       {/* Sleep Records Table */}
//       <div className="bg-white rounded-2xl shadow-lg p-6">
//         <h2 className="text-2xl font-bold text-gray-800 mb-6">Sleep History</h2>
//         {sleepRecords.length === 0 ? (
//           <p className="text-gray-600">No sleep records found.</p>
//         ) : (
//           <div className="overflow-x-auto">
//             <table className="min-w-full divide-y divide-gray-200">
//               <thead>
//                 <tr>
//                   <th className="px-4 py-2 text-left text-gray-700">Sleep Start</th>
//                   <th className="px-4 py-2 text-left text-gray-700">Sleep End</th>
//                   <th className="px-4 py-2 text-left text-gray-700">Duration</th>
//                   <th className="px-4 py-2 text-left text-gray-700">Quality</th>
//                   <th className="px-4 py-2 text-left text-gray-700">Notes</th>
//                   <th className="px-4 py-2 text-left text-gray-700">AI Tip</th>
//                   <th className="px-4 py-2 text-left text-gray-700">Actions</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-gray-100">
//                 {sleepRecords.map((record) => {
//                   const start = new Date(`2000-01-01T${record.sleepStart}`);
//                   const end = new Date(`2000-01-01T${record.sleepEnd}`);
//                   let duration = (end - start) / (1000 * 60 * 60);
//                   if (duration < 0) duration += 24;
//                   duration = duration.toFixed(1);

//                   return (
//                     <tr key={record._id}>
//                       <td className="px-4 py-2">{record.sleepStart}</td>
//                       <td className="px-4 py-2">{record.sleepEnd}</td>
//                       <td className="px-4 py-2">{duration} hrs</td>
//                       <td className="px-4 py-2">{record.sleepQuality}/10</td>
//                       <td className="px-4 py-2">{record.notes || '-'}</td>
//                       <td className="px-4 py-2 text-green-600">{record.aiTip || '-'}</td>
//                       <td className="px-4 py-2 space-x-2">
//                         <button
//                           className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
//                           onClick={() => setEditingRecord(record)}
//                         >
//                           Edit
//                         </button>
//                         <button
//                           className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600"
//                           onClick={() => handleDelete(record._id)}
//                         >
//                           Delete
//                         </button>
//                       </td>
//                     </tr>
//                   );
//                 })}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default SleepHistory;

// // // src/components/Sleep/SleepHistory.jsx
// // import React, { useEffect, useState } from 'react';
// // import { apiService } from '../../services/api';
// // import { useApp } from '../../contexts/AppContext';

// // const SleepHistory = ({ onEdit }) => {
// //   const { state, dispatch } = useApp();
// //   const [sleepRecords, setSleepRecords] = useState([]);
// //   const [loading, setLoading] = useState(false);

// //   // Fetch sleep history
// //   const fetchHistory = async () => {
// //     try {
// //       setLoading(true);
// //       const result = await apiService.getSleepHistory();
// //       if (result.success) setSleepRecords(result.data);
// //     } catch (err) {
// //       console.error('Error fetching sleep history:', err);
// //       alert('Failed to load sleep history');
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchHistory();
// //   }, []);

// //   // Delete record
// //   const handleDelete = async (id) => {
// //     if (!window.confirm('Are you sure you want to delete this record?')) return;
// //     try {
// //       const result = await apiService.deleteSleepRecord(id);
// //       if (result.success) {
// //         setSleepRecords((prev) => prev.filter((r) => r._id !== id));
// //         alert('Sleep record deleted');
// //       }
// //     } catch (err) {
// //       console.error('Error deleting record:', err);
// //       alert('Failed to delete record');
// //     }
// //   };

// //   // Format time/duration
// //   const formatDuration = (start, end) => {
// //     const s = new Date(`2000-01-01T${start}`);
// //     const e = new Date(`2000-01-01T${end}`);
// //     let diff = (e - s) / (1000 * 60 * 60);
// //     if (diff < 0) diff += 24;
// //     return `${diff.toFixed(1)} hrs`;
// //   };

// //   return (
// //     <div className="bg-white rounded-2xl shadow-lg p-6 mt-8">
// //       <h2 className="text-2xl font-bold text-gray-800 mb-4">Sleep History</h2>

// //       {loading ? (
// //         <p className="text-gray-600">Loading records...</p>
// //       ) : sleepRecords.length === 0 ? (
// //         <p className="text-gray-600">No sleep records yet.</p>
// //       ) : (
// //         <div className="overflow-x-auto">
// //           <table className="min-w-full divide-y divide-gray-200">
// //             <thead className="bg-gray-50">
// //               <tr>
// //                 <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Date</th>
// //                 <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Start</th>
// //                 <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">End</th>
// //                 <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Duration</th>
// //                 <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Quality</th>
// //                 <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">AI Tip</th>
// //                 <th className="px-4 py-2 text-center text-sm font-medium text-gray-700">Actions</th>
// //               </tr>
// //             </thead>
// //             <tbody className="divide-y divide-gray-200">
// //               {sleepRecords.map((record) => (
// //                 <tr key={record._id} className="hover:bg-gray-50">
// //                   <td className="px-4 py-2 text-sm text-gray-600">{new Date(record.createdAt).toLocaleDateString()}</td>
// //                   <td className="px-4 py-2 text-sm text-gray-600">{record.sleepStart}</td>
// //                   <td className="px-4 py-2 text-sm text-gray-600">{record.sleepEnd}</td>
// //                   <td className="px-4 py-2 text-sm text-gray-600">{formatDuration(record.sleepStart, record.sleepEnd)}</td>
// //                   <td className="px-4 py-2 text-sm text-gray-600">{record.sleepQuality}/10</td>
// //                   <td className="px-4 py-2 text-sm text-green-700">{record.aiTip || '-'}</td>
// //                   <td className="px-4 py-2 text-center space-x-2">
// //                     <button
// //                       onClick={() => onEdit(record)}
// //                       className="px-3 py-1 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
// //                     >
// //                       Edit
// //                     </button>
// //                     <button
// //                       onClick={() => handleDelete(record._id)}
// //                       className="px-3 py-1 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
// //                     >
// //                       Delete
// //                     </button>
// //                   </td>
// //                 </tr>
// //               ))}
// //             </tbody>
// //           </table>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default SleepHistory;
