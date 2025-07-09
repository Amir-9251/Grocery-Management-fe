import { Switch } from "radix-ui";
import "./style.css";

interface SwitchProps {
    isOn?: boolean;
    value?: 'on' | 'off';
    name?: string;
    onChange?: (checked: boolean) => void;
}
const SwitchButton = ({ value, isOn, name, onChange }: SwitchProps) => {


    return (<div className="flex items-center gap-2 mt-2">

        <Switch.Root className="SwitchRoot" id="airplane-mode" onCheckedChange={onChange} checked={isOn} defaultChecked={!isOn} name={name} value={value}>
            <Switch.Thumb className="SwitchThumb" />
        </Switch.Root>
    </div>)

}

export default SwitchButton;
