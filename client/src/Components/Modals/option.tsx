interface optionProps {
    icon:string;
    label: string;
}
const Option = ({option}:{option:optionProps}) => {
  return (
    <div className=' option flex items-center gap-3 text-white cursor-pointer py-2 px-4'>
        <div className='w-5 h-5'>
            <img className="w-full h-full" src={option.icon} alt="user" />
        </div>
        <p className='font-semibold'>{option.label}</p>
    </div>
  )
}

export default Option