import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover";
  import { Paperclip } from "lucide-react";
  import Option from "../models/option";
  import { medaiOptions } from "@/constants";
  
  
  const ShareMedia = () => {
    return (
        <Popover>
          <PopoverTrigger><Paperclip /></PopoverTrigger>
          <PopoverContent className="border-0 mx-3 mt-2 px-0 bg-[#444254]">
              <div className="space-y-2">
                  {medaiOptions.map(option => (<Option key={option.label} option={option}/>))}
              </div>
          </PopoverContent>
        </Popover>
    );
  };
  
  export default ShareMedia;
  