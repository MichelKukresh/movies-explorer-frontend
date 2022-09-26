import "./ButtonSubmit.css";

function ButtonSubmit(props) {
  return(
    <button type={props.type} className="buttonSubmit">{props.title}</button>
  )
}

export default ButtonSubmit;