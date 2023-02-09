import { useForm } from "react-hook-form";

import "./style.css";
import arrow from "../../icons/Vector.svg";

const Experience = (props) => {

  return (
    <div className="grid-container">
      <div className="form-generator">
        <a href="/" className="icon">
          <img src={arrow} alt="Your SVG" className="svg" />
        </a>
        <header>
          <div className="header-content">
            <div className="header-text">გამოცდილება</div>
            <div>2/3</div>
          </div>
        </header>
        <Form />
      </div>
    </div>
  );
};

const Form = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <form action="">
      <div className="form-div form-content">
        <label htmlFor="position" type="text">
          თანამდებობა
        </label>
        <div>
          <input
            type="text"
            {...register("position", {
              required: true,
              minLength: 2,
            })}
            placeholder="დეველოპერი, დიზაინერი, ა."
          />
        </div>
        <p className="warning">მინიმუმ 2 ასო</p>
      </div>
      <div className="form-div form-content">
        <label htmlFor="employer" type="text">
          დამსაქმებელი
        </label>
        <div>
          <input
            type="text"
            {...register("employer", {
              required: true,
              minLength: 2,
            })}
            placeholder="დამსაქმებელი"
          />
        </div>
        <p className="warning">მინიმუმ 2 ასო</p>
      </div>
    </form>
  );
};

export default Experience;
