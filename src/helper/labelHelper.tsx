interface LabelHelperProps {
  text: string;
  required?: boolean;
}

const LabelHelper = ({ text, required = false }: LabelHelperProps) => {
  return (
    <label className='text-sm font-medium text-gray-900 block mb-2'>
      {text}
      {required && <span className='text-red-500 ml-1'>*</span>}
    </label>
  );
};

export default LabelHelper;
