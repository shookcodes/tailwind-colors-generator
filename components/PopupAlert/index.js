const PopupAlert = ({ alertVisible, setAlertVisible }) => {
  const handleAlertClick = () => {
    setAlertVisible(() => {
      return false;
    });
  };
  return (
    <div
      className={`${
        alertVisible ? "flex" : "hidden"
      } fixed bg-gray-800 bg-opacity-60 bottom-0 h-screen w-full justify-center items-center z-50`}
    >
      <div className="flex flex-col justify-evenly items-center text-center w-full mx-6 px-6 max-w-xl bg-gray-50 rounded-lg h-52 -mt-32">
        Oops, this color is already on your palette.
        <button className="buttonPrimary" onClick={handleAlertClick}>
          OK
        </button>
      </div>
    </div>
  );
};
export default PopupAlert;
