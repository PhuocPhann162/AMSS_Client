export const renderPlaceholder = (
  type: 'select' | 'input',
  fieldName: string,
  isEdit: boolean,
) => {
  if (!isEdit) return '';
  return `${type === 'input' ? 'Enter' : 'Select'} ${fieldName}`;
};
