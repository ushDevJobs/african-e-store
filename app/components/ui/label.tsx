import React from "react";

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
    text: React.JSX.Element
}

const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
    ({ className, htmlFor, text, ...props }, ref) => {
        return (
            <label
                htmlFor={htmlFor}
                className={`block text-base font-medium text-[#1E1E1E] ${className}`}
                {...props}
                {...ref}
            >
                {text}
            </label>
        );
    }
);

Label.displayName = "Label";

export default Label;