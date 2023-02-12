import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import Resume from "../Resume";
import "./style.css";
import arrow from "../../icons/Vector.svg";

const Education = () => {
  const storedData = JSON.parse(localStorage.getItem("data"));

  const navigate = useNavigate();

  const [formCount, setFormCount] = useState(1);
  const [data, setData] = useState({
    personalInfo: storedData.personalInfo,
    experience: storedData.experience,
    education: [
      {
        id: 1,
        school: "",
        degree: "",
        startDate: "",
        description: "",
      },
    ],
  });

  useEffect(() => {
    if (storedData.education) {
      setData(storedData);
    }
  }, []);

  const handleChange = (e, id) => {
    const updatedForms = data.education.map((form) => {
      if (form.id === id) {
        return { ...form, [e.target.name]: e.target.value };
      }
      return form;
    });
    setData({ ...data, education: updatedForms });
    localStorage.setItem("data", JSON.stringify(data));
  };

  const handleClick = () => {
    setFormCount(formCount + 1);
    setData({
      ...data,
      education: [
        ...data.education,
        {
          id: formCount + 1,
          school: "",
          degree: "",
          startDate: "",
          description: "",
        },
      ],
    });
  };

  const removeData = () => {
    localStorage.removeItem("data");
  };

  const onSubmit = () => {
    localStorage.setItem("data", JSON.stringify(data));
    navigate("/result");
  };

  const onBack = () => {
    localStorage.setItem("data", JSON.stringify(data));
    navigate("/experience");
  };

  return (
    <div className="grid-container">
      <div className="form-generator">
        <a href="/" className="icon" onClick={removeData}>
          <img src={arrow} alt="Your SVG" className="svg" />
        </a>
        <header className="form-header">
          <div className="header-content">
            <div className="header-text">განათლება</div>
            <div>3/3</div>
          </div>
        </header>
        {data.education.map((form) => (
          <Form key={form.id} form={form} onChange={handleChange} />
        ))}
        <div className="content">
          <button className="add-button" onClick={handleClick}>
            სხვა სასწავლებლის დამატება
          </button>
          <div className="buttons">
            <button className="back" onClick={onBack} type={"button"}>
              უკან
            </button>
            <button className="submit" onClick={onSubmit} type={"submit"}>
              დასრულება
            </button>
          </div>
        </div>
      </div>
      <Resume props={data} />
    </div>
  );
};

const Form = ({ form, onChange }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <form action="" className="content">
      <div className="form-div form-content">
        <label htmlFor="school" type="text">
          განათლება
        </label>
        <div>
          <input
            type="text"
            {...register("school", {
              required: true,
              minLength: 2,
            })}
            onChange={(e) => onChange(e, form.id)}
            value={form.school}
            placeholder="სასწავლებელი"
          />
        </div>
        <p className="warning">მინიმუმ 2 ასო</p>
      </div>
      <div className="flex-container">
        <div className="form-div form-content">
          <label htmlFor="degree">ხარისხი</label>
          <select
            name="degree"
            onChange={(e) => onChange(e, form.id)}
            defaultValue={"აირჩიეთ ხარისხი"}
            value={form.degree}
          >
            <option value="none" selected disabled hidden>
              აირჩიეთ ხარისხი
            </option>
            <option value="საშუალო სკოლა">საშუალო სკოლა</option>
            <option value="ზოგადსაგანმანათლებლო დიპლომი">
              ზოგადსაგანმანათლებლო დიპლომი
            </option>
            <option value="ბაკალავრი">ბაკალავრი</option>
            <option value="მაგისტრი">მაგისტრი</option>
            <option value="დოქტორი">დოქტორი</option>
            <option value="ასოცირებული ხარისხი">ასოცირებული ხარისხი</option>
            <option value="სტუდენტი">სტუდენტი</option>
            <option value="კოლეჯი">კოლეჯი</option>
            <option value="სხვა">სხვა</option>
          </select>
        </div>
        <div className="form-div form-content">
          <label htmlFor="startDate">დამთავრების რიცხვი</label>
          <input
            type="date"
            {...register("endDate", { required: true })}
            defaultValue={form.endDate}
            onChange={(e) => onChange(e, form.id)}
            placeholder="mm / dd / yyyy"
          />
        </div>
      </div>
      <div className="form-div form-content ">
        <label htmlFor="description">აღწერა</label>
        <textarea
          {...register("description", { required: true })}
          className="textbox"
          cols="30"
          rows="5"
          defaultValue={form.description}
          onChange={(e) => onChange(e, form.id)}
          placeholder="განათლების აღწერა"
        ></textarea>
      </div>
      <hr />
    </form>
  );
};

export default Education;
