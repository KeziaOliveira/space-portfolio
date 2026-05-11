import './Button.css';

export default function Button({
  children,
  variant = 'primary',
  href,
  onClick,
  download,
  icon,
  className = '',
  ...props
}) {
  const classes = `btn btn--${variant} ${className}`.trim();

  if (href) {
    return (
      <a
        href={href}
        className={classes}
        download={download}
        target={href.startsWith('http') ? '_blank' : undefined}
        rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
        {...props}
      >
        {icon && <span className="btn__icon">{icon}</span>}
        {children}
      </a>
    );
  }

  return (
    <button className={classes} onClick={onClick} {...props}>
      {icon && <span className="btn__icon">{icon}</span>}
      {children}
    </button>
  );
}
