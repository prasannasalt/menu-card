const Button = ({ children, onClick, className }) => (
    <button
      onClick={onClick}
      className={`bg-lightBlue text-sky-600 px-6 py-3 rounded-lg hover:bg-sky-500 transition-all duration-300 ${className}`}
    >
      {children}
    </button>
  );
  
  export default Button;
  