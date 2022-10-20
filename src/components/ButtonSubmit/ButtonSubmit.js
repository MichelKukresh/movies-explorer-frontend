import "./ButtonSubmit.css";

function ButtonSubmit(props) {
  function handleClick(e) {
    e.preventDefault();
    props.onClick();
  }

  //console.log(props);


  return (
    <button
      disabled={!props.isDisableStatus}
      onClick={(e) => handleClick(e)}
      type={props.type}
      className={`buttonSubmit ${props.isDisableStatus && "buttonSubmit_activ"}`}
    >
      {props.title}
    </button>
  );
}

export default ButtonSubmit;
