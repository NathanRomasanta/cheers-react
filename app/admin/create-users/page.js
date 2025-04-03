'use client';

import { use, useState, useRef } from 'react';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { app } from '/app/_utils/Firebase'; // Ensure you have firebaseConfig.js setup
import { db } from '/app/_utils/Firebase';
import { collection, getDocs, doc, setDoc } from 'firebase/firestore';
import { Toast } from 'primereact/toast';
import 'primereact/resources/themes/lara-light-indigo/theme.css'; // theme
import 'primereact/resources/primereact.min.css'; // core css
import 'primeicons/primeicons.css';
import { useRouter } from 'next/navigation';
export default function CreateUsers() {
  const options = [
    'Super Admin',
    'Barista',
    'Cashout Admin',
    'Inventory Admin',
    'Bar Manager',
  ];
  const auth = getAuth(app);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [accountType, setaAccountType] = useState(null);
  const toast = useRef(null);
  const router = useRouter();

  const handleSelect = (option) => {
    setaAccountType(option);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const handleCreateClick = (item) => {
    setIsModalOpen(true);
  };
  const handleSignup = async (e) => {
    if (email == '' || password == '' || firstName == '' || lastName == '') {
      toast.current.show({
        severity: 'error',
        summary: 'Error',
        detail: 'Please fill in all fields',
        life: 3000,
      });
    } else {
      e.preventDefault();
      setError('');
      setSuccess('');
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

        const userRef = doc(db, 'Accounts', email);

        // Prepare data object
        const userData = {
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: password,
          accountType: accountType,
        };

        await setDoc(userRef, userData);

        if (accountType == 'Barista') {
          //docRef = await addDoc(collection(db, "myCollection"), data);
        }
        // Reset form

        setSuccess('Account created successfully!');
        setEmail('');
        setPassword('');
        setFirstName('');
        setLastName('');
        setaAccountType('');

        toast.current.show({
          severity: 'success',
          summary: 'Success',
          detail: 'Successfully made a new user',
          life: 3000,
        });

        await signOut(auth);
        router.push('/login');
      } catch (err) {
        setError(err.message);
        toast.current.show({
          severity: 'error',
          summary: 'Error',
          detail: err.message,
          life: 3000,
        });
      }
    }
  };

  return (
    <div className='min-h-screen bg-gray-50 py-12 px-4 h-100 w-100'>
      <div className='w-max mx-auto bg-white p-8 rounded-lg shadow-md'>
        <Toast ref={toast} />
        <h1 className='text-2xl font-bold mb-4 text-black'>Create New Users</h1>
        <div className='flex flex-col gap-3 w-2xl'>
          <div className='flex-row space-x-5'></div>
          <label className='text-black'>Details</label>
          <div className=' flex flex-row space-x-5'>
            <input
              type='text'
              placeholder='First Name'
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className='input input-bordered input-warning'
              required
            />

            <input
              type='text'
              placeholder='Last Name'
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className='input input-bordered input-warning  '
              required
            />
          </div>
          <input
            type='email'
            placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='input input-bordered input-warning w-full '
            required
          />
          <input
            placeholder='Temporary Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='input input-bordered input-warning w-full '
            required
          />

          <label className='text-black'>Account Type</label>
          <div className='flex flex-col gap-2'>
            {options.map((option, index) => (
              <label
                key={index}
                className='flex items-center gap-2 cursor-pointer text-gray-700'>
                <input
                  type='checkbox'
                  checked={accountType === option}
                  onChange={() => handleSelect(option)}
                  className='checkbox checkbox-warning'
                />
                {option}
              </label>
            ))}
          </div>
          <button
            type='submit'
            onClick={handleCreateClick}
            className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50'>
            Create Account
          </button>
        </div>
        {error && <p className='text-red-500 mt-2'>{error}</p>}
        {success && <p className='text-green-500 mt-2'>{success}</p>}

        {/* Edit Modal */}
        {isModalOpen && (
          <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4'>
            <div className='bg-white rounded-lg w-full max-w-md p-6'>
              <h2 className='text-xl font-bold mb-4 text-black'>
                Create Account?
              </h2>

              <div className='mb-4'>
                <p className='block text-black mb-2'>
                  Creating an account logs you out of the system
                </p>
                <p className='block text-black mb-2 '>
                  Are you sure you want to continue?
                </p>
              </div>

              <div className='flex space-x-5'>
                <button
                  type='submit'
                  onClick={handleCloseModal}
                  className='w-full flex justify-center py-2 px-4 border border-orange-600 rounded-md shadow-sm text-sm font-medium text-orange-600  hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50'>
                  Cancel
                </button>
                <button
                  type='submit'
                  onClick={handleSignup}
                  className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50'>
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
