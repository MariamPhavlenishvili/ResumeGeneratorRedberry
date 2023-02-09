import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Resume from "../Resume";

import "./style.css";
import arrow from "../../icons/Vector.svg";

const Experience = (props) => {
  const [formCount, setFormCount] = useState(1);

  const removeData = () => {
    localStorage.removeItem("data");
  };

  const handleClick = () => {
    setFormCount(formCount + 1);
  };

  return (
    <div className="grid-container">
      <div className="form-generator">
        <a href="/" className="icon" onClick={removeData}>
          <img src={arrow} alt="Your SVG" className="svg" />
        </a>
        <header>
          <div className="header-content">
            <div className="header-text">გამოცდილება</div>
            <div>2/3</div>
          </div>
        </header>
        {Array.from({ length: formCount }, (_, i) => (
          <div key={i}>
            <Form id={formCount}/>
          </div>
        ))}
        <div className="content">
          <button className="add-button" onClick={handleClick}>
            მეტი გამოცდილების დამატება
          </button>
          <div className="buttons">
            <input type="submit" value="შემდეგი" className="submit" />
            <input type="back" value="უკან" className="back" />
          </div>
        </div>
      </div>
      <Resume />
    </div>
  );
};

const Form = ({ id }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [data, setData] = useState(
    JSON.parse(localStorage.getItem("data")) || [{
      id: 1,
      position: "",
      employer: "",
      startDate: "",
      endDate: "",
      description: "",
    }]
  );

  const onChange = (event) => {
    setData([
      ...data,
      {id:id, [event.target.name]: event.target.value},
    ]);
  };

  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(data));
  }, [data]);

  return (
    <form action="" className="content">
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
            onChange={onChange}
            value={data.position}
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
            onChange={onChange}
            value={data.employer}
            placeholder="დამსაქმებელი"
          />
        </div>
        <p className="warning">მინიმუმ 2 ასო</p>
      </div>
      <div className="flex-container">
        <div className="form-div form-content">
          <label htmlFor="startDate">დაწყების რიცხვი</label>
          <input
            type="date"
            {...register("startDate", { required: true })}
            onChange={onChange}
            value={data.startDate}
            placeholder="mm / dd / yyyy"
          />
        </div>
        <div className="form-div form-content">
          <label htmlFor="startDate">დამთავრების რიცხვი</label>
          <input
            type="date"
            {...register("endDate", { required: true })}
            onChange={onChange}
            value={data.endDate}
            placeholder="mm / dd / yyyy"
          />
        </div>
      </div>
      <div className="form-div form-content ">
        <label htmlFor="describtion">აღწერა</label>
        <textarea
          {...register("describtion", { required: true })}
          className="textbox"
          cols="30"
          rows="5"
          onChange={onChange}
          value={data.description}
          placeholder="როლი თანამდებობაზე და ზოგადი აღწერა"
        ></textarea>
      </div>
      <hr />
    </form>
  );
};

export default Experience;
