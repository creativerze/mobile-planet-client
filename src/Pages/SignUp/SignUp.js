import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

const SignUp = () => {

  const { register, handleSubmit, formState: { errors } } = useForm();


  const handleSignUp = (data) => {
    console.log(data);
  };

  return (
    <div className='h-[700px] flex justify-center items-center'>
      <div className='w-96 p-7'>
        <h2 className='text-3xl text-center text-primary'>Sign Up</h2>
        <form onSubmit={handleSubmit(handleSignUp)}>

          <div className="form-control w-full max-w-xs">
            <label className="label"> <span className="label-text">Name</span></label>
            <input type="text" {...register("name", {
              required: "Name is Required"
            })} className="input input-bordered w-full max-w-xs" />
            {errors.name && <p className='text-red-500'>{errors.name.message}</p>}
          </div>

          <div className="form-control w-full max-w-xs">
            <label className="label"> <span className="label-text">Email</span></label>
            <input type="email" {...register("email", {
              required: true
            })} className="input input-bordered w-full max-w-xs" />
            {errors.email && <p className='text-red-500'>{errors.email.message}</p>}
          </div>

          <div className="form-control w-full max-w-xs my-3 border border-stone-300 rounded-lg">
            <select {...register("category", { required: true })}>
              <option value="">Select Buyer or Seller</option>
              <option value="Buyer">Buyer</option>
              <option value="Seller">Seller</option>
            </select>
            {/* {errors.category && <p className='text-red-500'>{errors.category.message}</p>} */}
          </div>

          <div className="form-control w-full max-w-xs">
            <label className="label"> <span className="label-text">Password</span></label>
            <input type="password" {...register("password", {
              required: "Password is required",
              minLength: { value: 6, message: "Password must be 6 characters long" },
              pattern: { value: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])/, message: 'Password must have uppercase, number and special characters' }
            })} className="input input-bordered w-full max-w-xs" />
            {errors.password && <p className='text-red-500'>{errors.password.message}</p>}
          </div>

          <input className='btn btn-primary w-full mt-4' value="Sign Up" type="submit" />
        </form>
        <p>Already have an account <Link className='text-primary' to="/login">Please Login</Link></p>
        <div className="divider">OR</div>
        <button className='btn btn-outline btn-primary w-full'>CONTINUE WITH GOOGLE</button>

      </div>
    </div>
  );
};

export default SignUp;