import React from "react";
import { useForm } from "react-hook-form";
import Heading from "../../UI/Heading/Heading";

const EditQuiz = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    // reset,
  } = useForm();

  const handleSubmitForm = (data) => {
    console.log(data);
  };

  return (
    <div className="mt-10">
      <Heading form heading="Edit quiz" />
      <div className="row my-3">
        <div className="col-12 col-md-9 col-lg-8">
          <form onSubmit={handleSubmit(handleSubmitForm)}>
            <div className="form-group">
              <h4>
                {errors.quizname && <span>please enter a quiz name</span>}
              </h4>
              <input
                type="text"
                className="form-control"
                placeholder="enter quiz name"
                {...register("quizname", {
                  required: true,
                })}
              />
            </div>
            <div className="form-group">
              <h4>{errors.email && <span>please enter a valid email</span>}</h4>
              <input
                type="email"
                className="form-control"
                placeholder="enter email"
                {...register("email", {
                  required: true,
                  pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                })}
              />
            </div>
            <button className="btn btn-dark mt-3 col-12">Add Quiz</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditQuiz;
