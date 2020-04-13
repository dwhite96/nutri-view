import React from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import Loader from 'react-loader-spinner';

import FoodResponseView from './FoodResponseView';

const displayFetchingStatus = (isFetching) => {
  if (isFetching) {
    return (
      <Loader
        type="Oval"
        color="#00BFFF"
      />
    );
  }

  return null;
};

const FoodSearchInput = ({
  isFetching,
  response,
  searchFood,
  saveFood,
}) => (
  <div>
    <Formik
      initialValues={{ foodSearch: '' }}
      validate={(values) => {
        const errors = {};
        if (!values.foodSearch) {
          errors.foodSearch = 'Required';
        }

        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        searchFood(values.foodSearch);

        setTimeout(() => {
          setSubmitting(false);
        }, 400);
      }}
    >
      {(formik) => (
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
    <div>
      {displayFetchingStatus(isFetching)}
    </div>
    <FoodResponseView response={response} saveFood={saveFood} />
  </div>
);

FoodSearchInput.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  response: PropTypes.shape({}).isRequired,
  searchFood: PropTypes.func.isRequired,
  saveFood: PropTypes.func.isRequired,
};

export default FoodSearchInput;
