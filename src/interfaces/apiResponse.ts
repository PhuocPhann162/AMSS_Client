export default interface apiResponse {
  data?: {
    // this will be included in suggestions so if possible use the format if u know that.
    statusCode?: number;
    isSuccess?: boolean;
    successMessage?: string;
    errorMessages?: Array<string>;
    result: {
      // this will not give suggestions
      [key: string]: string;
    };
  };
  error?: any;
}
