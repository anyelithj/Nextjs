import React, { useRef, useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { Formik, Field, Form, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { IFormValues, ISearchProps } from '@/types/types';

const Search: React.FC<ISearchProps> = ({
  placeholder = 'Search Movies...',
  isMobile = false,
}) => {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const validationSchema = Yup.object({
    searchQuery: Yup.string()
      .required('Please enter a search term')
      .min(3, 'The search term must have at least 3 characters.')
      .matches(/^[a-zA-Z0-9\s]*$/, 'Special characters are not allowed.')
      .trim('Please remove unnecessary spaces.'),
  });

  const handleSearch = (query: string) => {
    const decodeURIQuery = decodeURIComponent(query);
    if (!decodeURIQuery.trim()) return;
    router.push(`/search/${decodeURIQuery}?page=1`);
  };

  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage);
    }
  }, [errorMessage]);

  return (
    <>
      <ToastContainer position='top-right' autoClose={5000} className='mt-25' />
      <Formik
        initialValues={{ searchQuery: '' }}
        validationSchema={validationSchema}
        onSubmit={(
          values: IFormValues,
          { resetForm, setErrors, setTouched }: FormikHelpers<IFormValues>
        ) => {
          const { searchQuery } = values;
          handleSearch(searchQuery);
          resetForm();
          setTouched({ searchQuery: false });
          setErrors({});
        }}
        validateOnBlur={true}
        validateOnChange={false}
      >
        {({ submitForm, validateForm }) => {
          const handleKeyDown = async (e: React.KeyboardEvent) => {
            if (e.key === 'Enter') {
              const formErrors = await validateForm();
              if (formErrors.searchQuery) {
                setErrorMessage(formErrors.searchQuery);
              } else {
                submitForm();
                inputRef.current?.focus();
              }
            }
          };

          const handleSearchClick = async (e: React.MouseEvent) => {
            e.preventDefault();
            const formErrors = await validateForm();
            if (formErrors.searchQuery) {
              setErrorMessage(formErrors.searchQuery);
            } else {
              submitForm();
              inputRef.current?.focus();
            }
          };

          return (
            <div
              className={`relative flex flex-col ${isMobile ? 'ml-36 w-[280px]' : 'w-full'}`}
            >
              <Form className='flex items-center'>
                <Field
                  name='searchQuery'
                  type='text'
                  className='focus:border-cyan w-[280px] rounded-lg border border-transparent bg-secondary px-4 py-1 pl-2 outline-none placeholder:text-textColor'
                  placeholder={placeholder}
                  onKeyDown={handleKeyDown}
                  innerRef={inputRef}
                />
                <button
                  type='button'
                  className='absolute right-1 cursor-pointer bg-secondary text-textColor hover:bg-textColor hover:text-white'
                  onClick={handleSearchClick}
                >
                  <FaSearch style={{ width: '20px', height: '20px' }} />
                </button>
              </Form>
            </div>
          );
        }}
      </Formik>
    </>
  );
};

export default Search;
