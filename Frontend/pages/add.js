import TaskForm from '../components/TaskForm';

const AddTask = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <TaskForm />
      </div>
    </div>
  );
};

export default AddTask;