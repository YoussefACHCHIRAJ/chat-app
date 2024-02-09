const ErrorMessageModel = () => {
  return (
    <div className="flex items-center justify-center flex-col h-full">
      <svg
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        className="w-14 h-14 text-red"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
        />
      </svg>
      <span className="text-gray-400 mt-2">
        Sorry, can't fetch your message
      </span>
      <span className="text-gray-400 mt-2">
        It could be throw a server error
      </span>
    </div>
  );
};

export default ErrorMessageModel;
