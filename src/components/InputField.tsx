import { type IconDefinition } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { type ChangeEvent } from "react";

interface InputProps {
  label: string;
  icon: IconDefinition;
  type?: string;
  value: string;
  name?: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  rightIcon?: IconDefinition;
  onRightIconClick?: () => void;
}

export const InputField = ({
  label,
  icon,
  type = "text",
  value,
  name,
  placeholder,
  onChange,
  rightIcon,
  onRightIconClick,
}: InputProps) => (
  <div className="flex flex-col gap-1">
    <label className="text-sm text-gray-600 flex items-center gap-2">
      <FontAwesomeIcon icon={icon} />
      {label}
    </label>

    <div className="relative">
      <FontAwesomeIcon
        icon={icon}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
      />

      <input
        type={type}
        value={value}
        name={name || label.toLowerCase().replace(" ", "-")}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full py-3 pl-10 pr-10 border rounded-xl border-green-500 focus:outline-none text-xs"
      />

      {rightIcon && (
        <button
          type="button"
          onClick={onRightIconClick}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
          aria-label={`Toggle ${label}`}
          title={`Toggle ${label}`}
        >
          <FontAwesomeIcon icon={rightIcon} aria-hidden="true" />
        </button>
      )}
    </div>
  </div>
);
