import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/Components/ui/popover";
import { MoreVertical } from "lucide-react";
import Option from "../Modals/option";
import { options } from "@/Constants";


const Options = () => {
  return (
      <Popover>
        <PopoverTrigger><MoreVertical  className="text-white"/></PopoverTrigger>
        <PopoverContent className="border-0 mx-3 mt-2 px-0 bg-[#444254]">
            <div className="space-y-2">
                {options.map(option => (<Option key={option.label} option={option}/>))}
            </div>
        </PopoverContent>
      </Popover>
  );
};

export default Options;
