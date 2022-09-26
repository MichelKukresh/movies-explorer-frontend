import "./RadioButton.css";

function RadioButton(props) {
  return (
    <label className="radioButtom">
      <input
        className="radioButtom__input"
        type="checkbox"
        onChange={props.onChange}
      />
      <span className="radioButtom__slider" />
    </label>
  );
}

export default RadioButton;
