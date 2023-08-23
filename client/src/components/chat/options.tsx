import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { MoreVertical } from "lucide-react";
import Option from "../models/option";
import { options } from "@/constants";


const Options = () => {
  return (
      <Popover>
        <PopoverTrigger><MoreVertical /></PopoverTrigger>
        <PopoverContent>
            <div className="space-y-4">
                {options.map(option => (<Option key={option.label} option={option}/>))}
            </div>
        </PopoverContent>
      </Popover>
  );
};

export default Options;
