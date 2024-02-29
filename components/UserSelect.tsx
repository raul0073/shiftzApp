"use client";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { ProfileType } from "@/models/profile";
export function SelectProfileComp({
  profiles,
  handleProfileChangeSelect,
}: {
  profiles: ProfileType[];
  handleProfileChangeSelect: (profile: ProfileType) => void;
}) {
const handleProfileChange = (selectedValue: string) => {
	const prof: ProfileType = selectedValue = JSON.parse(selectedValue)
	handleProfileChangeSelect(prof)
}
  return (
    <>
      <Select onValueChange={handleProfileChange}>
        <SelectTrigger className="w-[300px]">
          <SelectValue
          placeholder="Select Profile" className="w-fit p-0" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel >User profiles</SelectLabel>
            {profiles.map((prof: ProfileType, index: number) => (
              <SelectItem
                key={index}
                value={JSON.stringify(prof)} // Pass the whole profile object as the value
              >
                <p>{prof.name}</p>
                <i className="text-muted-foreground">{prof.workPlace}</i>
                <br />
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </>
  );
}