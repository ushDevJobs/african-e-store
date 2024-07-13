import * as React from "react"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    btnIcon?: React.ReactElement;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, type, btnIcon, ...props }, ref) => {
        return (
            <button
                type={type}
                className={`bg-[#2C7865] text-white font-medium py-3 px-6 rounded-full hover:bg-[#2C7865]-foreground hover:text:bg-[#2C7865] ${className}`}
                ref={ref}
                {...props}
            >
                {btnIcon && <span>{btnIcon}</span>}
                {/* {props.disabled && <ComponentLoader lightTheme  customBackground="#B1883D" customLoaderColor="#000" />} */}
                {props.children}
            </button>
        );
    }
);

Button.displayName = "Button";

export default Button;