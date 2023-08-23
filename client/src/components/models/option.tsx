interface optionProps {
    icon:string;
    label: string;
}
const Option = ({option}:{option:optionProps}) => {
  return (
    <div className='flex items-center gap-1'>
        <div className='w-5 h-5'>
            <img className="w-full h-full" src={option.icon} alt="user" />
        </div>
        <p className=''>{option.label}</p>
    </div>
  )
}

export default Option