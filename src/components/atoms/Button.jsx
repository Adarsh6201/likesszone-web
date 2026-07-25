import React from 'react';
import { Loader2 } from 'lucide-react';

/**
 * Reusable Button Atom component built following Atomic Design principles.
 * Features customizable variants, sizes, loading states, accessibility guidelines,
 * and passes native HTML button attributes.
 *
 * @component
 * @param {Object} props
 * @param {'primary' | 'secondary' | 'danger' | 'outline' | 'ghost'} [props.variant='primary'] - Visual variant style of the button
 * @param {'sm' | 'md' | 'lg'} [props.size='md'] - Height and padding size scale of the button
 * @param {boolean} [props.isLoading=false] - Shows a loading spinner and disables interaction
 * @param {boolean} [props.isDisabled=false] - Disables interaction and applies muted gray scale styles
 * @param {React.ReactNode} [props.leftIcon] - Renders an icon/element on the left side of children text
 * @param {React.ReactNode} [props.rightIcon] - Renders an icon/element on the right side of children text
 * @param {string} [props.className=''] - Custom Tailwind CSS classes to extend or override default styles
 * @param {React.ReactNode} props.children - Text content or node children to render inside the button
 */
export const Button = React.forwardRef(({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  isDisabled = false,
  leftIcon,
  rightIcon,
  className = '',
  children,
  type = 'button',
  ...rest
}, ref) => {

  // Base layout styles
  const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed select-none active:scale-97';

  // Variant styles map
  const variants = {
    primary: 'bg-indigo-600 hover:bg-indigo-755 text-white shadow-md shadow-indigo-100 dark:shadow-none focus:ring-indigo-500',
    secondary: 'bg-slate-100 hover:bg-slate-200 text-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-white focus:ring-slate-500',
    danger: 'bg-red-600 hover:bg-red-700 text-white shadow-md shadow-red-100 dark:shadow-none focus:ring-red-500',
    outline: 'border border-slate-200 bg-white hover:bg-slate-50 text-slate-705 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-350 dark:hover:bg-slate-850 focus:ring-indigo-550',
    ghost: 'text-slate-600 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-800/50 focus:ring-slate-500'
  };

  // Size styles map
  const sizes = {
    sm: 'px-3.5 py-1.5 text-xs gap-1.5',
    md: 'px-5 py-2.5 text-sm gap-2',
    lg: 'px-7 py-3 text-base gap-2.5'
  };

  // Disabled and Loading overrides
  const disabledStyles = (isDisabled || isLoading)
    ? 'opacity-55 pointer-events-none scale-100 active:scale-100'
    : '';

  return (
    <button
      ref={ref}
      type={type}
      disabled={isDisabled || isLoading}
      aria-busy={isLoading}
      aria-disabled={isDisabled || isLoading}
      className={`
        ${baseStyles}
        ${variants[variant]}
        ${sizes[size]}
        ${disabledStyles}
        ${className}
      `}
      {...rest}
    >
      {/* Loading Spinner */}
      {isLoading && (
        <Loader2 className="h-4 w-4 animate-spin shrink-0" aria-hidden="true" />
      )}

      {/* Left Icon (only visible when not loading) */}
      {!isLoading && leftIcon && (
        <span className="flex shrink-0 items-center justify-center" aria-hidden="true">
          {leftIcon}
        </span>
      )}

      {/* Button Content */}
      <span className="truncate">{children}</span>

      {/* Right Icon */}
      {!isLoading && rightIcon && (
        <span className="flex shrink-0 items-center justify-center" aria-hidden="true">
          {rightIcon}
        </span>
      )}
    </button>
  );
});

Button.displayName = 'Button';
