interface LabelHelperProps {
  text: string;
  required?: boolean;
}

const LabelHelper = ({ text, required = false }: LabelHelperProps) => {
  return (
    <label className='mb-2 block text-sm font-medium text-[#7b7b7b]'>
      {text}
      {required && <span className='ml-1 text-red-500'>*</span>}
    </label>
  );
};

export default LabelHelper;
