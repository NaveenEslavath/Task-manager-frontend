// import { useState, useEffect } from 'react';
// import Link from 'next/link';
// import { useRouter } from 'next/router';

// const Home = () => {
//   const [tasks, setTasks] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [filter, setFilter] = useState('all');
//   const router = useRouter();

//   useEffect(() => {
//     fetchTasks();
//   }, []);

//   const fetchTasks = async () => {
//     try {
//       setLoading(true);
//       const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tasks`);
      
//       if (!response.ok) {
//         throw new Error('Failed to fetch tasks');
//       }
      
//       const data = await response.json();
//       setTasks(data);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const deleteTask = async (id) => {
//     if (!confirm('Are you sure you want to delete this task?')) {
//       return;
//     }

//     try {
//       const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tasks/${id}`, {
//         method: 'DELETE',
//       });

//       if (!response.ok) {
//         throw new Error('Failed to delete task');
//       }

//       setTasks(tasks.filter(task => task.id !== id));
//     } catch (err) {
//       alert('Error deleting task: ' + err.message);
//     }
//   };

//   const getStatusBadge = (status) => {
//     const statusStyles = {
//       todo: 'bg-yellow-100 text-yellow-800',
//       in_progress: 'bg-blue-100 text-blue-800',
//       done: 'bg-green-100 text-green-800'
//     };

//     const statusLabels = {
//       todo: 'To Do',
//       in_progress: 'In Progress',
//       done: 'Done'
//     };

//     return (
//       <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusStyles[status]}`}>
//         {statusLabels[status]}
//       </span>
//     );
//   };

//   const filteredTasks = tasks.filter(task => {
//     if (filter === 'all') return true;
//     return task.status === filter;
//   });

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="text-xl text-gray-600">Loading tasks...</div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 py-8">
//       <div className="max-w-4xl mx-auto px-4">
//         <div className="flex justify-between items-center mb-8">
//           <h1 className="text-3xl font-bold text-gray-900">Task Manager</h1>
//           <Link
//             href="/add"
//             className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           >
//             Add New Task
//           </Link>
//         </div>

//         {error && (
//           <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
//             {error}
//           </div>
//         )}

//         {/* Filter buttons */}
//         <div className="mb-6 flex flex-wrap gap-2">
//           <button
//             onClick={() => setFilter('all')}
//             className={`px-4 py-2 rounded-md text-sm font-medium ${
//               filter === 'all'
//                 ? 'bg-blue-600 text-white'
//                 : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
//             }`}
//           >
//             All Tasks ({tasks.length})
//           </button>
//           <button
//             onClick={() => setFilter('todo')}
//             className={`px-4 py-2 rounded-md text-sm font-medium ${
//               filter === 'todo'
//                 ? 'bg-yellow-500 text-white'
//                 : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
//             }`}
//           >
//             To Do ({tasks.filter(t => t.status === 'todo').length})
//           </button>
//           <button
//             onClick={() => setFilter('in_progress')}
//             className={`px-4 py-2 rounded-md text-sm font-medium ${
//               filter === 'in_progress'
//                 ? 'bg-blue-500 text-white'
//                 : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
//             }`}
//           >
//             In Progress ({tasks.filter(t => t.status === 'in_progress').length})
//           </button>
//           <button
//             onClick={() => setFilter('done')}
//             className={`px-4 py-2 rounded-md text-sm font-medium ${
//               filter === 'done'
//                 ? 'bg-green-500 text-white'
//                 : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
//             }`}
//           >
//             Done ({tasks.filter(t => t.status === 'done').length})
//           </button>
//         </div>

//         {/* Tasks list */}
//         {filteredTasks.length === 0 ? (
//           <div className="text-center py-12">
//             <div className="text-gray-500 text-lg mb-4">
//               {filter === 'all' ? 'No tasks found' : `No ${filter.replace('_', ' ')} tasks`}
//             </div>
//             <Link
//               href="/add"
//               className="text-blue-600 hover:text-blue-800 font-medium"
//             >
//               Create your first task
//             </Link>
//           </div>
//         ) : (
//           <div className="grid gap-4">
//             {filteredTasks.map((task) => (
//               <div key={task.id} className="bg-white rounded-lg shadow-md p-6">
//                 <div className="flex justify-between items-start mb-3">
//                   <h3 className="text-lg font-semibold text-gray-900">{task.title}</h3>
//                   {getStatusBadge(task.status)}
//                 </div>
                
//                 {task.description && (
//                   <p className="text-gray-600 mb-3">{task.description}</p>
//                 )}
                
//                 <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
//                   <div>
//                     {task.dueDate && (
//                       <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
//                     )}
//                   </div>
//                   <div>
//                     Created: {new Date(task.createdAt).toLocaleDateString()}
//                   </div>
//                 </div>
                
//                 <div className="flex gap-2">
//                   <Link
//                     href={`/edit/${task.id}`}
//                     className="px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   >
//                     Edit
//                   </Link>
//                   <button
//                     onClick={() => deleteTask(task.id)}
//                     className="px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-500"
//                   >
//                     Delete
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Home;

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all');
  const router = useRouter();

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tasks`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch tasks');
      }
      
      const data = await response.json();
      setTasks(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteTask = async (id) => {
    if (!confirm('Are you sure you want to delete this task?')) {
      return;
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tasks/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete task');
      }

      setTasks(tasks.filter(task => task.id !== id));
    } catch (err) {
      alert('Error deleting task: ' + err.message);
    }
  };

  const getStatusBadge = (status) => {
    const statusStyles = {
      todo: 'bg-yellow-100 text-yellow-800',
      in_progress: 'bg-blue-100 text-blue-800',
      done: 'bg-green-100 text-green-800'
    };

    const statusLabels = {
      todo: 'To Do',
      in_progress: 'In Progress',
      done: 'Done'
    };

    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusStyles[status]}`}>
        {statusLabels[status]}
      </span>
    );
  };

  const getStatusColor = (status) => {
    const colors = {
      todo: 'border-l-4 border-yellow-400',
      in_progress: 'border-l-4 border-blue-400',
      done: 'border-l-4 border-green-400'
    };
    return colors[status] || 'border-l-4 border-gray-400';
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true;
    return task.status === filter;
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 bg-purple-50">
        <div className="animate-pulse text-purple-800 font-semibold">Loading tasks...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 text-red-600 text-center p-6 rounded-lg shadow-md border border-red-200 max-w-3xl mx-auto mt-8">
        <p className="font-semibold mb-2">Error Loading Tasks</p>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-6 pb-12 bg-purple-50">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-6 text-purple-800 relative">
            <span className="bg-purple-100 px-6 py-3 rounded-full inline-block shadow-sm">
              Task Manager
            </span>
          </h1>
          <Link
            href="/add"
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:-translate-y-1 shadow-md inline-block"
          >
            Add New Task
          </Link>
        </div>

        {/* Filter Section */}
        <div className="mb-8">
          <h3 className="text-xl font-bold mb-4 text-center text-purple-800">
            <span className="bg-purple-100 px-4 py-2 rounded-full inline-block shadow-sm text-sm">
              Filter Tasks
            </span>
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                filter === 'all'
                  ? 'bg-purple-600 text-white shadow-md transform -translate-y-1'
                  : 'bg-white text-purple-700 border border-purple-200 hover:bg-purple-50 hover:shadow-sm'
              }`}
            >
              All Tasks ({tasks.length})
            </button>
            <button
              onClick={() => setFilter('todo')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                filter === 'todo'
                  ? 'bg-yellow-500 text-white shadow-md transform -translate-y-1'
                  : 'bg-white text-yellow-700 border border-yellow-200 hover:bg-yellow-50 hover:shadow-sm'
              }`}
            >
              To Do ({tasks.filter(t => t.status === 'todo').length})
            </button>
            <button
              onClick={() => setFilter('in_progress')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                filter === 'in_progress'
                  ? 'bg-blue-500 text-white shadow-md transform -translate-y-1'
                  : 'bg-white text-blue-700 border border-blue-200 hover:bg-blue-50 hover:shadow-sm'
              }`}
            >
              In Progress ({tasks.filter(t => t.status === 'in_progress').length})
            </button>
            <button
              onClick={() => setFilter('done')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                filter === 'done'
                  ? 'bg-green-500 text-white shadow-md transform -translate-y-1'
                  : 'bg-white text-green-700 border border-green-200 hover:bg-green-50 hover:shadow-sm'
              }`}
            >
              Done ({tasks.filter(t => t.status === 'done').length})
            </button>
          </div>
        </div>

        {/* Tasks Section */}
        {filteredTasks.length === 0 ? (
          <div className="text-center p-6 bg-yellow-50 rounded-lg max-w-lg mx-auto shadow-md border border-yellow-200">
            <p className="text-yellow-800 font-medium mb-4">
              {filter === 'all' ? 'No tasks found' : `No ${filter.replace('_', ' ')} tasks`}
            </p>
            <Link
              href="/add"
              className="text-purple-600 hover:text-purple-800 font-medium underline"
            >
              Create your first task
            </Link>
          </div>
        ) : (
          <div>
            <h3 className="text-2xl font-bold mb-6 text-center text-purple-800 relative">
              <span className="bg-purple-100 px-6 py-2 rounded-full inline-block shadow-sm">
                {filter === 'all' ? 'All Tasks' : 
                 filter === 'todo' ? 'To Do Tasks' :
                 filter === 'in_progress' ? 'In Progress Tasks' : 'Completed Tasks'}
              </span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTasks.map((task) => (
                <div 
                  key={task.id} 
                  className={`bg-white rounded-xl shadow-md overflow-hidden border border-purple-100 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 ${getStatusColor(task.status)}`}
                >
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <h4 className="font-bold text-purple-900 text-lg leading-tight">{task.title}</h4>
                      {getStatusBadge(task.status)}
                    </div>
                    
                    {task.description && (
                      <p className="text-gray-600 text-sm mb-4 line-clamp-3">{task.description}</p>
                    )}
                    
                    <div className="text-xs text-gray-500 mb-4 space-y-1">
                      {task.dueDate && (
                        <div className="flex items-center">
                          <span className="font-medium">Due:</span>
                          <span className="ml-1">{new Date(task.dueDate).toLocaleDateString()}</span>
                        </div>
                      )}
                      <div className="flex items-center">
                        <span className="font-medium">Created:</span>
                        <span className="ml-1">{new Date(task.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Link
                        href={`/edit/${task.id}`}
                        className="flex-1 py-2 text-center rounded-md text-sm font-medium bg-purple-100 hover:bg-purple-200 text-purple-700 transition-colors"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => deleteTask(task.id)}
                        className="flex-1 py-2 rounded-md text-sm font-medium bg-red-100 hover:bg-red-200 text-red-700 transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;