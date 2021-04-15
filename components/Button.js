export default function Button({ onClick, children }) {
  return (
    <button
      style={{ borderColor: "rgb(189, 108, 218)", color: "rgb(189, 108, 218)" }}
      onClick={onClick}
      className="border-2 rounded-full py-3 px-4 text-sm m-4"
    >
      {children}
    </button>
  );
}
