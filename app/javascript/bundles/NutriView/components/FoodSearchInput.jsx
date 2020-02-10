import React from 'react';
import { Formik } from 'formik';

const FoodSearchInput = () => {
  return (
    <Formik
      initialValues={{ foodSearch: '' }}
      validate={values => {
        const errors = {};
        if (!values.foodSearch) {
          errors.foodSearch = 'Required';
        }

        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
      }}
    >
      {formik => (
        <form onSubmit={formik.handleSubmit}>
          <label htmlFor="foodSearch">Food Search</label>
          <input
            id="foodSearch"
            name="foodSearch"
            type="text"
            placeholder="Enter food search terms or UPC..."
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.foodSearch}
          />
          {formik.touched.foodSearch && formik.errors.foodSearch ? (
            <div>{formik.errors.foodSearch}</div>
          ) : null}
          <button
            className="primary hollow button"
            type="submit"
          >
            Submit
          </button>
        </form>
      )}
    </Formik>
  );
};

export default FoodSearchInput;
