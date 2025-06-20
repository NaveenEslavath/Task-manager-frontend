import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import TaskForm from '../../components/TaskForm';

const EditTask = () => {
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      fetchTask();
    }
  }, [id]);

  const fetchTask = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tasks`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch tasks');
      }
      
      const tasks = await response.json();
      const foundTask = tasks.find(t => t.id === id);
      
      if (!foundTask) {
        throw new Error('Task not found');
      }
      
      setTask(foundTask);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading task...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            Error: {error}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <TaskForm task={task} isEdit={true} />
      </div>
    </div>
  );
};

export default EditTask;