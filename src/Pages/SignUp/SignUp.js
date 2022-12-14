import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';

const SignUp = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const { createUser, updateUser, googleSignIn } = useContext(AuthContext);

  const [signUpError, setSignUPError] = useState('');

  // const [createdUserEmail, setCreatedUserEmail] = useState('');
  // const [token] = useToken(createdUserEmail);
  const navigate = useNavigate();

  // if (token) {
  //   navigate('/');
  // }

  const handleSignUp = (data) => {
    console.log('data', data);

    var users = {
      name: data.name,
      email: data.email,
      category: data.category
    };

    setSignUPError('');
    createUser(data.email, data.password)
      .then(result => {
        const user = result.user;
        console.log('user', user);
        toast('User Created Successfully.');

        fetch('https://mobile-planet-server.vercel.app/users', {
          method: 'POST',
          headers: {
            'content-type': 'application/json'
          },
          body: JSON.stringify(users)
        })
          .then(res => res.json())
          .then(data => {
            console.log('addUser', data);
          });

        const userInfo = {
          displayName: data.name
        };

        updateUser(userInfo)
          .then(() => {
            // saveUser(data.name, data.email);
            navigate('/');
          })
          .catch(error => console.log(error));
      })
      .catch(error => {
        console.log(error);
        setSignUPError(error.message);
      });


  };

  // const users = {
  //   name: user.displayName,
  //   email: user.email,
  //   category: 'Buyer'
  // };

  const handleGoogleSignIn = () => {
    googleSignIn()
      .then(result => {
        const user = result.user;
        console.log(user);

        const users = {
          name: user.displayName,
          email: user.email,
          category: 'Buyer'
        };

        fetch('https://mobile-planet-server.vercel.app/users', {
          method: 'POST',
          headers: {
            'content-type': 'application/json'
          },
          body: JSON.stringify(users)
        })
          .then(res => res.json())
          .then(data => {
            console.log('addUser', data);
          });


        navigate('/');
      })
      .catch(error => console.error(error));
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
          {signUpError && <p className='text-red-600'>{signUpError}</p>}
        </form>
        <p>Already have an account <Link className='text-primary' to="/login">Please Login</Link></p>
        <div className="divider">OR</div>
        <button onClick={handleGoogleSignIn} className='btn btn-outline btn-primary w-full'>CONTINUE WITH GOOGLE</button>

      </div>
    </div>
  );
};

export default SignUp;