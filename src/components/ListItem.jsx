const ListItem = ({ name, sub, ...props }) => <button className={`listItem${sub ? " sub" : ""}`} {...props}>{name && `${name.charAt(0).toUpperCase()}${name.slice(1)}`}</button>

export default ListItem