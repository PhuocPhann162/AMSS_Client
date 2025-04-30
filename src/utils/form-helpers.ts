export const objectToFormData = (obj: any, parentKey = ''): FormData => {
  const formData = new FormData();

  for (const key in obj) {
    if (obj[key] !== undefined && obj[key] !== null) {
      const value = obj[key];
      const formKey = parentKey ? `${parentKey}.${key}` : key;

      if (value instanceof Date) {
        formData.append(formKey, value.toISOString());
      } else if (typeof value === 'boolean') {
        formData.append(formKey, value.toString());
      } else if (typeof value === 'number') {
        formData.append(formKey, value.toString());
      } else if (typeof value === 'object' && !(value instanceof File)) {
        formData.append(formKey, JSON.stringify(value));
      } else {
        formData.append(formKey, value);
      }
    }
  }

  return formData;
};
