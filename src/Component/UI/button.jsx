const button = (props) => {
  return (
    <butoon
      dat={props.testid}
      className={props.className}
      onClick={props.onClick}
    >
      {props.text}
    </butoon>
  );
};

export default button;
