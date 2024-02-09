interface optionProps {
  icon: string;
  label: string;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}
const Option = ({ option }: { option: optionProps }) => {
  const { icon, label, setOpen } = option;
  return (
    <button className="w-full option flex items-center gap-3 text-white cursor-pointer py-2 px-4" onClick={() => setOpen!(true)}>
      <div className="w-5 h-5">
        <img className="w-full h-full" src={icon} alt="user" />
      </div>
      <p className="font-semibold">{label}</p>
    </button>
  );
};

export default Option;
